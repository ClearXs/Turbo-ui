import { directGetIcon } from '@/components/Icon/shared';
import { Constant, TreeConstant } from '@/constant';

export const NUMBER = { value: 'number', label: '数字型' } as Constant;

export const CHARACTER = { value: 'character', label: '字符型' } as Constant;

export const BoAttributeTypes = [
  {
    value: 'number',
    label: '数字型',
    icon: directGetIcon('IconBookH5Stroked'),
    depth: 0,
    children: [
      { value: 'bigint', label: 'bigint' },
      { value: 'smallint', label: 'smallint' },
      { value: 'int', label: 'int' },
      { value: 'bit', label: 'bit' },
      { value: 'tinyint', label: 'tinyint' },
      { value: 'number', label: 'number' },
      { value: 'double', label: 'double' },
      { value: 'float', label: 'float' },
      { value: 'decimal', label: 'decimal' },
    ],
  },
  {
    value: 'character',
    label: '字符型',
    icon: directGetIcon('IconTextStroked'),
    depth: 0,
    children: [
      {
        value: 'char',
        label: 'char',
      },
      {
        value: 'varchar',
        label: 'varchar',
      },
      {
        value: 'nvarchar',
        label: 'nvarchar',
      },
    ],
  },
  {
    value: 'datetime',
    label: '时间型',
    icon: directGetIcon('IconCalendarClock'),
    children: [
      {
        value: 'time',
        label: 'time',
      },
      {
        value: 'timestamp',
        label: 'timestamp',
      },
      {
        value: 'date',
        label: 'date',
      },
    ],
  },
  {
    value: 'advanced',
    label: '高级类型',
    icon: directGetIcon('IconFolderStroked'),
    depth: 0,
    children: [
      {
        value: 'object',
        label: 'object',
        extra: 'json对象类型',
      },
      {
        value: 'array',
        label: 'array',
      },
    ],
  },
] as TreeConstant[];
