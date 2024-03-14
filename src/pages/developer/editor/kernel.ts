import { Dic } from '@/api/system/dic';
import { BoSchema, Engine } from '@designable/core';
import { Dictionary } from '@designable/core/lib/models/Dictionary';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { useContext } from 'react';
import { KernelContext } from './context';
import { from } from '@/components/TForm/formily/schema';
import { TableCrudProps } from '@/components/TableCrud/interface';
import { TreePanelProps } from '@/components/Tree';
import { IdEntity } from '@/api/interface';

// 数据视图
export type DataView = TableCrudProps<IdEntity> & {
  leftTree?: TreePanelProps<any>;
};

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
