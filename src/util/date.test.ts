import { PATTERN_DATE, format, parse } from './date';

test('test format and parse', () => {
  const date1 = format('2023-01-01', PATTERN_DATE);
  assert.isNotNull(date1);

  const dateStr1 = parse(date1, PATTERN_DATE);
  assert.equal('2023-01-01', dateStr1);

  const date2 = format('2023-01-01 00:00:00');
  assert.isNotNull(date2);

  const dateStr2 = parse(date2);
  assert.equal('2023-01-01 00:00:00', dateStr2);
});
