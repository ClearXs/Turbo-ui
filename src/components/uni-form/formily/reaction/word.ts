import _ from 'lodash';
import pinyin from 'tiny-pinyin';

export type Word =
  | 'camel'
  | 'snake'
  | 'kebab'
  | 'lower'
  | 'upper'
  | 'start'
  | 'plain'
  | 'pinyin';

export type Feature = (s: string) => string;

// camelCase
const CAMEL: Feature = (s) => {
  return _.camelCase(s);
};

// snake_case
const SNAKE: Feature = (s) => {
  return _.snakeCase(s);
};

// kebab-case
const KEBAB: Feature = (s) => {
  return _.kebabCase(s);
};

// lower
const LOWER: Feature = (s) => {
  return _.lowerCase(s);
};

// UPPERCASE
const UPPER: Feature = (s) => {
  return _.upperCase(s);
};

// StartCase
const START: Feature = (s) => {
  return _.startCase(s);
};

// plain -> plain
const PLAIN: Feature = (s) => {
  return s;
};

// 拼音 -> PinYin
const PINYIN: Feature = (s) => {
  return pinyin.convertToPinyin(s, ' ', true).split(' ').map(START).join('');
};

export const getFeature = (word: Word): Feature | undefined => {
  switch (word) {
    case 'camel':
      return CAMEL;
    case 'snake':
      return SNAKE;
    case 'kebab':
      return KEBAB;
    case 'lower':
      return LOWER;
    case 'upper':
      return UPPER;
    case 'start':
      return START;
    case 'plain':
      return PLAIN;
    case 'pinyin':
      return PINYIN;
    default:
      return undefined;
  }
};
