import isString from 'is-string';
import isObject from 'is-object';

const defaultLogLevel = 4;
const initialId = 101;
const randomIdChars = 4;

const randomIdNum = () => {
  const n1000x = 10 ** (randomIdChars - 1);
  const n10000x = 10 ** randomIdChars;
  const n8999y = n10000x - n1000x - 1;
  return n1000x + Math.floor(n8999y * Math.random());
};

const plainLog = (item) => console.log(item); /* eslint-disable-line no-console */

const log = (logger, levelText, data) => {
  let logString = '';
  let logObject = null;
  if (isString(data)) {
    logString = data;
  } else if (isObject(data)) {
    if (isString(data.text)) {
      logString = data.text;
    } else if (data.obj) {
      logObject = data.obj;
    }
  }
  if (logString.length > 0) plainLog(`${logger.introText}${levelText}${logString}`);
  if (logObject) plainLog(logObject);
};

const ht = (logger, text) => (logger.hideLevel ? '' : text);

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
    Object.freeze(this);
  }

  get isLogger() { return true; } /* eslint-disable-line class-methods-use-this */

  fatal(data) { if (this.level >= 1) log(this, '################ FATAL ################ ', data); }

  error(data) { if (this.level >= 2) log(this, '***** ERROR ***** ', data); }

  warn(data) { if (this.level >= 3) log(this, 'WARNING:  ', data); }

  success(data) { if (this.level >= 4) log(this, ht(this, 'Success:  '), data); }

  info(data) { if (this.level >= 5) log(this, ht(this, ' Info:    '), data); }

  debug(data) { if (this.level >= 6) log(this, ht(this, '  debug:  '), data); }

  trace(data) { if (this.level >= 7) log(this, ht(this, '   trace: '), data); }
}

export default Logger;
