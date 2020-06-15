import { Logger, packageName } from '../src';

test('test Logger in index.js', () => {
  const logger = new Logger();
  expect(!!logger).toBeTruthy();
});

test('test packageName in index.js', () => {
  expect(packageName).toEqual('log-count');
});
