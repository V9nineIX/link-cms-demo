import _ from 'lodash';
import api from '../config/api'

/**
 * Basic class to store key/value configuration
 */
class Config {
  constructor() {
    this._config = {
      'baseUrl':api.host

    };
  }

  get(key) {
    return this._config[key];
  }

  set(key, value) {
    if (typeof key === 'object') {
      _.assign(this._config, key);
    } else {
      this._config[key] = value;
    }
  }
}

export default new Config();
