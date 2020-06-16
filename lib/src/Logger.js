import isString from 'is-string';
import isObject from 'is-object';


const defaultLogLevel = 4;
const initialId = 101;
const randomIdChars = 4;

const labels = [ // Levels 0 to 7, by index
  '',
  '################ FATAL ################ ',
  '***** ERROR ***** ',
  'WARNING:  ',
  'Success:  ',
  ' Info:    ',
  '  debug:  ',
  '   trace: ',
];

const getLevelText = (logger, level) => ((logger.level >= 4 && logger.hideLevel) ? '' : labels[level]);

const randomIdNum = () => {
  const n1000x = 10 ** (randomIdChars - 1);
  const n10000x = 10 ** randomIdChars;
  const n8999y = n10000x - n1000x - 1;
  return n1000x + Math.floor(n8999y * Math.random());
};

const log = (logger, inputData, level) => {
  // General log handling.
  // Return a string of any item that was logged

  // Turn input data into object called 'data'
  let data = null;
  if (isString(inputData)) {
    data = { text: inputData };
  } else if (isObject(inputData)) {
    data = inputData;
  } else {
    data = {};
  }

  // If data.type supplied, increment the count
  const { type } = data;
  if (isString(type)) {
    if (logger.count[type]) {
      logger.count[type] += 1; /* eslint-disable-line no-param-reassign */
    } else {
      logger.count[type] = 1; /* eslint-disable-line no-param-reassign */
    }
  }

  // If logger has lower level than message level (data.level), exit now
  if (logger.level < level) return '';

  // Find the string or object to be logged
  const logString = isString(data.text) ? data.text : '';
  const logObject = isObject(data.obj) ? data.obj : null;

  // Output the logged item to console
  let itemToLog = null;
  let textToReturn = null;
  if (logObject) {
    itemToLog = logObject;
    textToReturn = '';
  } else {
    itemToLog = (logString.length === 0) ? '' : `${logger.introText}${getLevelText(logger, level)}${logString}`;
    textToReturn = itemToLog;
  }
  if (level <= 2) {
    console.error(itemToLog); /* eslint-disable-line no-console */
  } else if (level <= 3) {
    console.warn(itemToLog); /* eslint-disable-line no-console */
  } else if (level <= 5) {
    console.info(itemToLog); /* eslint-disable-line no-console */
  } else {
    console.log(itemToLog); /* eslint-disable-line no-console */
  }
  return textToReturn;
};


let id = initialId;
class Logger {
  constructor(inputOptions) {
    const options = (isObject(inputOptions)) ? inputOptions : {};
    this.id = `${id}-${randomIdNum()}`;
    id += 1;
    this.shy = !!options.shy;
    this.hideLevel = !!options.hideLevel;
    this.introText = this.shy ? '' : `Logger [${this.id}]: `;
    let v = options.level;
    v = (Number.isInteger(v) && v >= 0 && v <= 7) ? v : defaultLogLevel;
    this.level = v;
    this.count = {};
    Object.freeze(this);
  }

  get isLogger() { return true; } /* eslint-disable-line class-methods-use-this */

  fatal(data) { return log(this, data, 1); }

  error(data) { return log(this, data, 2); }

  warn(data) { return log(this, data, 3); }

  success(data) { return log(this, data, 4); }

  info(data) { return log(this, data, 5); }

  debug(data) { return log(this, data, 6); }

  trace(data) { return log(this, data, 7); }
}

export default Logger;
