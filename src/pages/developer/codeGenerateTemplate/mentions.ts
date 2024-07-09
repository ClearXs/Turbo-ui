import { Completion } from '@/components/CodeEditor';

const boMentions = [
  {
    label: '@{module.name}',
    detail: '模块名称',
    info: '比如代码生成',
  },
  {
    label: '@{module.packagePath}',
    detail: '模块包路径',
  },
  {
    label: '@{module.requestPath}',
    detail: '模块请求路径',
  },
  {
    label: '@{module.version}',
    detail: '模块版本',
  },
  {
    label: '@{module.author}',
    detail: '模块作者',
  },
  {
    label: '@{module.key}',
    detail: '模块标识',
    info: '比如CodeGenerateTemplate',
  },
  {
    label: '@{module.system}',
    detail: '模块属于的子系统',
    info: '比如developer',
  },
  {
    label: '@{schema.name}',
    detail: '业务对象名称',
  },
  {
    label: '@{schema.code}',
    detail: '业务对象code',
  },
  {
    label: '@{schema.attrs}',
    detail: '属性集合',
  },
  {
    label: '@{column.id}',
    detail: '属性id',
  },
  {
    label: '@{column.key}',
    detail: '属性key',
  },
  {
    label: '@{column.field}',
    detail: '属性字段',
  },
  {
    label: '@{column.name}',
    detail: '属性名称',
  },
  {
    label: '@{column.type}',
    detail: '属性类型',
  },
  {
    label: '@{column.getJavaType}',
    detail: '获取Java类型',
  },
] as Completion[];

const boHelperMentions = [
  {
    label: '@{helper.getJavaType(boAttr)}',
    detail: 'get java type',
    section: {
      name: 'utility',
    },
  },
] as Completion[];

export default [...boMentions, ...boHelperMentions];
