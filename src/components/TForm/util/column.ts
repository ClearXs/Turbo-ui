import { IdEntity } from '@/api';
import {
  ColumnType,
  FormColumnProps,
  FormContext,
  RemoteProps,
} from '../interface';
import { Dic, DicApi, format } from '@/api/system/dic';
import { InternalRequest, createRequest } from '@/hook/request';
import { Constant } from '@/constant';
import { findPairValue, kvPairToObject } from './util';
import _ from 'lodash';

export type DefaultRemoteType = Omit<
  ColumnType,
  'user' | 'org' | 'post' | 'role'
>;

// definition default remote data
const DEFAULT_USER_REMOTE: RemoteProps = {
  url: '/api/sys/user/list',
  method: 'post',
  mapping: [
    { key: 'code', value: 'code' },
    { key: 'data', value: 'data' },
    { key: 'success', value: 200 },
    { key: 'value', value: 'id' },
    { key: 'label', value: 'username' },
  ],
};

const DEFAULT_ORG_REMOTE: RemoteProps = {
  url: '/api/sys/org/list',
  method: 'post',
};

const DEFAULT_POST_REMOTE: RemoteProps = {
  url: '/api/sys/post/list',
  method: 'post',
};

const DEFAULT_ROLE_REMOTE: RemoteProps = {
  url: '/api/sys/role/list',
  method: 'post',
};

const DEFAULT_REMOTE_DATA: Map<DefaultRemoteType, RemoteProps> = new Map();
DEFAULT_REMOTE_DATA.set('user', DEFAULT_USER_REMOTE);
DEFAULT_REMOTE_DATA.set('org', DEFAULT_ORG_REMOTE);
DEFAULT_REMOTE_DATA.set('post', DEFAULT_POST_REMOTE);
DEFAULT_REMOTE_DATA.set('role', DEFAULT_ROLE_REMOTE);

/**
 * load data set by remote request and dictionary
 *
 * @param formContext the form context
 * @param dicApi the dic api
 * @param request the internal request
 */
export const loadDataSet = <T extends IdEntity>(
  formContext: FormContext<T>,
  dicApi: DicApi,
  request: InternalRequest,
) => {
  const { columns } = formContext;
  // combine columns and sub-columns
  const subColumns = columns
    .filter((col) => col.type === 'jsonObject' || col.type === 'jsonArray')
    .flatMap((col) => {
      return (col['columns'] as FormColumnProps<T>[]) || [];
    });
  const combinationColumns = [...columns, ...subColumns];

  // load remote data
  const remoteCombine = loadRemote(combinationColumns, request);

  // load dictionary data
  const dicCombine = loadDictionary(combinationColumns, dicApi);

  // combine
  Promise.all([...remoteCombine, ...dicCombine]).then((all) => {
    const dataSet = all.reduce((buf, cur) => {
      return { ...buf, ...cur };
    }, {});
    formContext.dataSet = dataSet;
  });
};

/**
 * load remote data by column 'remote' props and default type
 *
 * @param combinationColumns combine columns and sub-columns
 * @param request the internal request
 * @returns  promise of record type
 */
const loadRemote = <T extends IdEntity>(
  combinationColumns: FormColumnProps<T>[],
  request: InternalRequest,
): Promise<Record<string, Constant[]>>[] => {
  const filedRemoteProps: Record<string, RemoteProps> = {};
  combinationColumns
    .filter((column) => Object.hasOwn(column, 'remote'))
    .forEach((col) => {
      filedRemoteProps[col.field] = col['remote'] as RemoteProps;
    });

  // get default
  const chooseRemoteType = new Set<DefaultRemoteType>();
  combinationColumns
    .filter((c) => DEFAULT_REMOTE_DATA.has(c.type))
    .forEach((c) => chooseRemoteType.add(c.type));

  chooseRemoteType.forEach((r) => {
    filedRemoteProps[r as string] = DEFAULT_REMOTE_DATA.get(r) as RemoteProps;
  });

  const promiseRemote: Promise<Record<string, Constant[]>>[] = [];

  // request and handle result set
  for (const filed in filedRemoteProps) {
    const records: Record<string, Constant[]> = {};
    const remoteProps = filedRemoteProps[filed];
    const {
      url,
      method = 'POST',
      params = [],
      headers = [],
      internal = true,
      mapping = [
        { key: 'code', value: 'code' },
        { key: 'data', value: 'data' },
        { key: 'success', value: 200 },
        { key: 'value', value: 'id' },
        { key: 'label', value: 'name' },
      ],
      formatter = (res: Record<string, any>) => {
        const code = findPairValue(mapping, 'code');
        const success = findPairValue(mapping, 'success');
        const data = findPairValue(mapping, 'data');
        const value = findPairValue(mapping, 'value');
        const label = findPairValue(mapping, 'label');
        if (res && res[code] === success) {
          const collection = res[data];
          if (collection && _.isArray(collection)) {
            const constant = collection.map((record) => {
              return {
                value: record?.[value],
                label: record?.[label],
              } as Constant;
            });
            records[filed] = constant;
          }
        }
        return records;
      },
    } = remoteProps;
    const paramsRecord = kvPairToObject(params);
    const headersRecord = kvPairToObject(headers);

    const requestPromise = internal
      ? request.request(url, method, paramsRecord, headersRecord)
      : createRequest().request(url, method, paramsRecord, headersRecord);
    const remotePromise = requestPromise
      .then((res) => {
        if (res.status === 200) {
          const result = res.data;
          return formatter(result);
        } else {
          return Promise.reject(
            `request ${url} has fatal error ${res.data}, make sure 'url' 'params' 'headers'... correct`,
          );
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    promiseRemote.push(remotePromise);
  }

  return promiseRemote;
};

/**
 * load dictionary if column props has dictionary
 *
 * @param combinationColumns combine columns and sub-columns
 * @param dicApi the dic api
 * @returns promise of record type
 */
const loadDictionary = <T extends IdEntity>(
  combinationColumns: FormColumnProps<T>[],
  dicApi: DicApi,
): Promise<Record<string, any>>[] => {
  return (
    combinationColumns
      .filter((column) => Object.hasOwn(column, 'dictionary'))
      .map((column) => {
        return dicApi
          .tree({ entity: { code: column['dictionary'] } })
          .then((res) => {
            const records: Record<string, any> = {};
            if (res.code === 200) {
              const data = res.data;
              // 编码查询字典树不会存储多个
              const dicTree = data.length > 0 && data[0];
              if (dicTree && !_.isEmpty(dicTree.children)) {
                const dics = format(dicTree.children as Dic[]);
                records[column['dictionary']] = dics;
              }
            }
            return records;
          });
      }) || Promise.resolve([])
  );
};
