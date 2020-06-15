import Logger from '../src/Logger';

describe('test Logger', () => {
  const tf = {}; // Test fixtures

  beforeEach(() => {
    tf.log0 = new Logger({
      level: 0,
      shy: false,
      hideLevel: true,
    });
    tf.log5 = new Logger({
      level: 5,
      shy: true,
      hideLevel: true,
    });
    tf.log7 = new Logger({
      level: 7,
      shy: false,
      hideLevel: false,
    });
  });

  test('Level 0 Logger logs', () => {
    tf.log0.fatal('Level 0 | fatal');
    tf.log0.error('Level 0 | error');
    tf.log0.warn('Level 0 | warn');
    tf.log0.success('Level 0 | success');
    tf.log0.info('Level 0 | info');
    tf.log0.debug('Level 0 | debug');
    tf.log0.trace('Level 0 | trace');
    expect(1 + 1).toEqual(2);
  });

  test('Level 5 Logger logs', () => {
    tf.log5.fatal('Level 5 | fatal');
    tf.log5.error('Level 5 | error');
    tf.log5.warn('Level 5 | warn');
    tf.log5.success('Level 5 | success');
    tf.log5.info('Level 5 | info');
    tf.log5.debug('Level 5 | debug');
    tf.log5.trace('Level 5 | trace');
    expect(1 + 1).toEqual(2);
  });

  test('Level 7 Logger logs', () => {
    tf.log7.fatal('Level 7 | fatal');
    tf.log7.error('Level 7 | error');
    tf.log7.warn('Level 7 | warn');
    tf.log7.success('Level 7 | success');
    tf.log7.info('Level 7 | info');
    tf.log7.debug('Level 7 | debug');
    tf.log7.trace('Level 7 | trace');
    expect(1 + 1).toEqual(2);
  });

  test('isLogger works', () => {
    expect(tf.log5.isLogger === true).toBeTruthy();
  });

  test('Can log with object with text', () => {
    tf.log7.info({ text: 'Text works' });
    expect(1 + 1).toEqual(2);
  });

  test('Can log plain object', () => {
    tf.log7.info({ obj: { an: 'object' } });
    expect(1 + 1).toEqual(2);
  });

  test('Edge case, log on empty object', () => {
    tf.log7.info({});
    expect(1 + 1).toEqual(2);
  });

  test('Edge case, log on invalid item', () => {
    tf.log7.info(null);
    expect(1 + 1).toEqual(2);
  });
});
