import { Logger } from '../src';

const logger = new Logger();

logger.success('Logging Success');

const logger7 = new Logger({
  level: 7,
  shy: false,
  hideLevel: false,
});
logger7.fatal('A fatal error');
logger7.error('An error');
logger7.warn('A warning');
logger7.success('A success');
logger7.info('An info');
logger7.debug('A debug');
logger7.trace('A trace');
logger7.debug({ text: 'Text can be supplied as an object' });
logger7.success({ obj: { or: 'you', can: 'log', any: 'object' } });
