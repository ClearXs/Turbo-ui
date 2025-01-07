import { Dic } from '@/api/system/dic';
import { BoSchema, Engine } from '@clearx/designable-core';
import {
  transformToSchema,
  transformToTreeNode,
} from '@clearx/designable-formily-transformer';
import { useContext } from 'react';
import { KernelContext } from './context';
import { from } from '@/components/tform/formily/schema';
import { TableCrudProps } from '@/components/table-crud/interface';
import { TreePanelProps } from '@/components/tree';
import { IdEntity } from '@/api';
import { Dictionary } from '@clearx/designable-core/lib/esm/models/Dictionary';

// 数据视图
export type DataView = TableCrudProps<IdEntity> & {
  leftTree?: TreePanelProps<any>;
};

// listable data type
export type DataType =
  | 'bit'
  | 'smallint'
  | 'tinyint'
  | 'int'
  | 'int2'
  | 'int4'
  | 'int8'
  | 'bigint'
  | 'float8'
  | 'numeric'
  | 'number'
  | 'double'
  | 'float'
  | 'decimal'
  | 'time'
  | 'timestamp'
  | 'date'
  | 'char'
  | 'character'
  | 'varchar'
  | 'nvarchar'
  | 'longvarchar'
  | 'longnvarchar'
  | 'varbinary'
  | 'longvarchar'
  | 'text'
  | 'object'
  | 'array';

export class Kernel {
  engine: Engine;
  dataView?: DataView;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  setBoTree(bo: BoSchema) {
    this.engine.setBoTree(bo);
  }

  setDictionary(dics: Dic[]) {
    const formatterDictionary = (dic: Dic): Dictionary => {
      return {
        id: dic.id,
        value: dic.code,
        key: dic.code,
        label: dic.name,
        children: dic.children.map(formatterDictionary),
      };
    };
    const dictionary = dics.map(formatterDictionary);
    this.engine.setDictionary(dictionary);
  }

  setISchema(formSchema: string) {
    this.engine.setCurrentTree(transformToTreeNode(JSON.parse(formSchema)));
  }

  /**
   * 返回当前表单设计的json 字符串ISchema数据
   */
  toISchema() {
    return JSON.stringify(
      transformToSchema(this.engine.getCurrentTree()),
      null,
      2,
    );
  }

  /**
   * 返回当前设计的BoSchema
   */
  toBoSchema() {
    return this.engine.getBoSchema();
  }

  /**
   * 基于#toBoSchema创建数据视图的Column实体
   */
  createDataViewColumns() {
    const boSchema = this.toBoSchema();
    return from(boSchema);
  }

  /**
   * 创建默认的数据视图
   */
  createDefaultDataView(): DataView {
    return {
      id: 'id',
      mode: 'page',
      columns: this.createDataViewColumns(),
    };
  }

  setDataView(dataView: DataView) {
    this.dataView = dataView;
  }

  getDataView() {
    return this.dataView;
  }
}

export const createKernel = (engine: Engine) => {
  return new Kernel(engine);
};

export const useKernel = () => {
  return useContext(KernelContext);
};
