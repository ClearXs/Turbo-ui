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
