import { Completion } from '@/components/CodeEditor';
import mvel from '@/components/CodeEditor/mentions/mvel';
import utility from '@/components/CodeEditor/mentions/utility';

export default [
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
    label: '@{table.comment}',
    detail: '表注释',
    info: 'like 模板管理',
  },
  {
    label: '@{table.name}',
    detail: '表名',
    info: 'like code_template',
  },
  {
    label: '@{column.name}',
    detail: '字段名',
  },
  ...mvel,
  ...utility,
] as Completion[];
