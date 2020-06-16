## log-count

[![npm version](https://badge.fury.io/js/log-count.svg)](https://badge.fury.io/js/log-count)
[![Downloads per month](https://img.shields.io/npm/dy/log-count.svg?maxAge=31536000)](https://github.com/davidryan59/log-count)
[![Build status](https://travis-ci.org/davidryan59/log-count.svg?master)](https://travis-ci.org/davidryan59)

### Classes

**Logger** - in your code, log messages at several different levels. Have the ability to change the logging level on the Logger instance so that only messages of certain importance are shown.

### Quick start

Do `npm install log-count` in your Javascript npm project directory. Then in a Javascript file:

``` js
// Importing
import { Logger } from 'log-count';

// Default constructor
const defaultLog = new Logger();
defaultLog.success('You have successfully displayed a success-level message using log-count');

// Constructing
const logger = new Logger({
  level: 7,
  shy: false,
  hideLevel: false,
});

// Logging
logger.fatal('A fatal error');
logger.error('An error');
logger.warn('A warning');
logger.success('A success');
logger.info('An info');
logger.debug('A debug');
logger.trace('A trace');
logger.debug({ text: 'Text can be supplied as an object' });
logger.success({ obj: { or: 'you', can: 'directly log', any: 'object' } });

// Counting
console.log(logger.count) // {}  // Empty object
logger.info({ type: 'myType' });
logger.error({ type: 'myTypeB' });
logger.debug({ type: 'myTypeB' });
console.log(logger.count) // { myType: 1, myTypeB: 2 }  // Each type gives a separate counter
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
