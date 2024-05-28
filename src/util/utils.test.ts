import _ from 'lodash';
import { shallowCopy } from './utils';

test('should first', () => {
  const source = { a: 1, b: { c: 1, d: 2 } };
  const obj = shallowCopy(source, { b: { c: 2 } });

  assert.equal(obj.b.c, 2);
});

test('should second', () => {
  const source = { a: 1, b: { c: 1, d: 2 } };
  const obj = shallowCopy(source, { b: { e: 2 } });

  assert.equal(obj.b.e, 2);
});

test('test _.assignWith', () => {
  const source = {};
  const target = { name: '2' };
  _.assignWith(source, target, (s, o, k) => {
    console.log(s);
  });
});
