export default {
  type: 'dateTime',
  format: 'yyyy-MM-dd HH:mm:ss',
  presets: [
    {
      text: '昨天',
      start: new Date(new Date().valueOf() - 1000 * 3600 * 24),
      end: new Date(),
    },
    {
      text: '当前时间',
      start: new Date(),
      end: new Date(),
    },
    {
      text: '明天',
      start: new Date(),
      end: new Date(new Date().valueOf() + 1000 * 3600 * 24),
    },
    {
      text: '下周',
      start: new Date(),
      end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
    },
    {
      text: '15天后',
      start: new Date(),
      end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
    },
    {
      text: '1个月后',
      start: new Date(),
      end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
    },
  ],
};
