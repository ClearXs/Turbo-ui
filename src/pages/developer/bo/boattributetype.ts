import { tryGetIcon } from '@/components/icon/shared';
import { TreeConstant } from '@/constant';
import Tree from '@/shared/tree';

export type BoAttributeTreeType = TreeConstant & {
  scale?: number;
  precision?: number;
};

export const BoAttributeTypes = [
  {
    tag: 'blue',
    value: 'number',
    label: '数字型',
    icon: tryGetIcon('IconInteger'),
    depth: 0,
    children: [
      { tag: 'blue', value: 'bigint', label: 'bigint', precision: 64 },
      { tag: 'blue', value: 'smallint', label: 'smallint', precision: 32 },
      { tag: 'blue', value: 'int', label: 'int', precision: 64 },
      { tag: 'blue', value: 'bit', label: 'bit', precision: 4 },
      { tag: 'blue', value: 'tinyint', label: 'tinyint', precision: 16 },
      {
        tag: 'blue',
        value: 'number',
        label: 'number',
        precision: 16,
        scale: 2,
      },
      {
        tag: 'blue',
        value: 'double',
        label: 'double',
        precision: 16,
        scale: 2,
      },
      { tag: 'blue', value: 'float', label: 'float', precision: 16, scale: 2 },
      {
        tag: 'blue',
        value: 'decimal',
        label: 'decimal',
        precision: 16,
        scale: 2,
      },
    ],
  },
  {
    value: 'character',
    label: '字符型',
    tag: 'amber',
    icon: tryGetIcon('IconCharacter'),
    depth: 0,
    children: [
      {
        tag: 'amber',
        value: 'char',
        label: 'char',
        precision: 64,
      },
      {
        tag: 'amber',
        value: 'varchar',
        label: 'varchar',
        precision: 64,
      },
      {
        tag: 'amber',
        value: 'longvarchar',
        label: 'text',
      },
    ],
  },
  {
    value: 'datetime',
    label: '时间型',
    icon: tryGetIcon('IconTime'),
    tag: 'cyan',
    children: [
      {
        tag: 'cyan',
        value: 'time',
        label: 'time',
        precision: 6,
      },
      {
        tag: 'cyan',
        value: 'timestamp',
        label: 'timestamp',
      },
      {
        tag: 'cyan',
        value: 'date',
        label: 'date',
        precision: 6,
      },
    ],
  },
  {
    value: 'other',
    label: '其他类型',
    icon: tryGetIcon('IconCalendarClock'),
    tag: 'indigo',
    children: [
      {
        tag: 'indigo',
        value: 'boolean',
        label: 'boolean',
        precision: 1,
      },
    ],
  },
  {
    value: 'advanced',
    label: '高级类型',
    icon: tryGetIcon('IconFolderStroked'),
    depth: 0,
    tag: 'yellow',
    children: [
      {
        tag: 'yellow',
        value: 'object',
        label: 'object',
        extra: 'json对象类型',
      },
      {
        tag: 'yellow',
        value: 'array',
        label: 'array',
      },
    ],
  },
] as BoAttributeTreeType[];

const BO_ATTRIBUTE_TREE = new Tree(BoAttributeTypes);

export default BO_ATTRIBUTE_TREE;
