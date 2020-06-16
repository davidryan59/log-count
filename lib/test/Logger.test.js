import Logger from '../src/Logger';

describe('test Logger', () => {
  const tf = {}; // Test fixtures

  beforeEach(() => {
    tf.default = new Logger();
    tf.log0 = new Logger({
      level: 0,
      shy: true,
      hideLevel: true,
    });
    tf.log4bold = new Logger({
      level: 4,
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
      shy: true,
      hideLevel: false,
    });
  });

  test('Level 0 Logger does not log anythin', () => {
    const fatal = tf.log0.fatal('Level 0 | fatal');
    tf.log0.error('Level 0 | error');
    const warn = tf.log0.warn('Level 0 | warn');
    tf.log0.success('Level 0 | success');
    tf.log0.info('Level 0 | info');
    tf.log0.debug('Level 0 | debug');
    tf.log0.trace('Level 0 | trace');
    expect(fatal).toEqual('');
    expect(warn).toEqual('');
  });

  test('Level 5 Logger logs up to info level', () => {
    tf.log5.fatal('Level 5 | fatal');
    const error = tf.log5.error('Level 5 | error');
    tf.log5.warn('Level 5 | warn');
    tf.log5.success('Level 5 | success');
    const info = tf.log5.info('Level 5 | info');
    const debug = tf.log5.debug('Level 5 | debug');
    tf.log5.trace('Level 5 | trace');
    expect(error).toEqual('Level 5 | error');
    expect(info).toEqual('Level 5 | info');
    expect(debug).toEqual('');
  });

  test('Level 7 Logger logs everything', () => {
    const fatal = tf.log7.fatal('Level 7 | fatal');
    const error = tf.log7.error('Level 7 | error');
    const warn = tf.log7.warn('Level 7 | warn');
    const success = tf.log7.success('Level 7 | success');
    const info = tf.log7.info('Level 7 | info');
    const debug = tf.log7.debug('Level 7 | debug');
    const trace = tf.log7.trace('Level 7 | trace');
    expect(fatal).toEqual('################ FATAL ################ Level 7 | fatal');
    expect(error).toEqual('***** ERROR ***** Level 7 | error');
    expect(warn).toEqual('WARNING:  Level 7 | warn');
    expect(success).toEqual('Success:  Level 7 | success');
    expect(info).toEqual(' Info:    Level 7 | info');
    expect(debug).toEqual('  debug:  Level 7 | debug');
    expect(trace).toEqual('   trace: Level 7 | trace');
  });

  test('isLogger works', () => {
    expect(tf.log5.isLogger === true).toBeTruthy();
  });

  test('Can log with object with text', () => {
    const result = tf.log5.info({ text: 'Text works' });
    expect(result).toEqual('Text works');
  });

  test('Can log plain object (returns empty string)', () => {
    const result = tf.log5.info({ obj: { an: 'object' } });
    expect(result).toEqual('');
  });

  test('Edge case, log on empty object', () => {
    const result = tf.log5.info({});
    expect(result).toEqual('');
  });

  test('Edge case, log on invalid item', () => {
    const result = tf.log5.info(null);
    expect(result).toEqual('');
  });

  test('Can keep track of count of types supplied', () => {
    tf.log7.info({ type: 'testType' });
    tf.log7.debug({ type: 'testType2' });
    tf.log7.warn({ type: 'testType' });
    tf.log7.error({ type: 'testType2' });
    const result = tf.log7.success({ type: 'testType2' });
    expect(tf.log7.count).toEqual({ testType: 2, testType2: 3 });
    expect(result).toEqual('');
  });

  test('Non-shy logger', () => {
    const result = tf.log4bold.warn('Logger that is not shy');
    // Result like 'Logger [148-4067]: Logger that is not shy'
    // Numbers can change
    expect(result.slice(0, 8)).toEqual('Logger [');
    expect(result.slice(16)).toEqual(']: Logger that is not shy');
  });

  test('Default logger', () => {
    const result = tf.default.success('Default logger');
    expect(result.slice(0, 8)).toEqual('Logger [');
    expect(result.slice(16)).toEqual(']: Success:  Default logger');
  });
});
