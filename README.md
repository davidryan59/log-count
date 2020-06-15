## log-count

[![npm version](https://badge.fury.io/js/log-count.svg)](https://badge.fury.io/js/log-count)
[![Downloads per month](https://img.shields.io/npm/dy/log-count.svg?maxAge=31536000)](https://github.com/davidryan59/log-count)
[![Build status](https://travis-ci.org/davidryan59/log-count.svg?master)](https://travis-ci.org/davidryan59)

### Classes

**Logger** - in your code, log messages at several different levels. Have the ability to change the logging level on the Logger instance so that only messages of certain importance are shown.

### Quick start

Do `npm install log-count` in your Javascript npm project directory. Then in a Javascript file:

``` js
import { Logger } from 'log-count';

const defaultLog = new Logger();
defaultLog.success('You have successfully displayed a success-level message using log-count');

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
logger7.success({ obj: { or: 'you', can: 'directly log', any: 'object' } });
```

### Constructor options

``` js
new Logger({ level, shy, hideLevel });
```

level: integer, from 0 to 7
- 0: log nothing
- 1: only log fatal
- 2: previous levels + errors
- 3: previous levels + warnings
- 4: previous levels + successes
- 5: previous levels + info
- 6: previous levels + debug
- 7: previous levels + trace

shy: boolean
- false: (default) logger prefixes its messages with its own name, helps to know how many loggers there are, which one is speaking
- true:  logger doesn't give its name when logging

hideLevel: boolean
- false: (default) logger always shows the message level
- true:  logger hides the level if is below FATAL, ERROR or WARNING
