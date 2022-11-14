export default class DataFetcher {
  constructor(dataObj, fetchTimeout) {
    this.dataObj = dataObj;
    this.fetchTimeout = fetchTimeout;
    this.cache = {};
    this.failedGroups = {};
  }

  _getDataFromPath(obj, path) {
    if (obj === null) return null;
    const splitPath = path.toString().split('.');
    let current = obj;
    for (const item of splitPath) {
      current = current[item];
      if (current === undefined) return null;
    }
    return current;
  }

  async _fetchWithTimeout(url) {
    const req = await fetch(url, {
      signal: AbortSignal.timeout(this.fetchTimeout),
    });
    const result = await req.json();
    return result;
  }

  async _getDataFromKey(key) {
    const obj = this.dataObj[key];
    if (obj.type === 'data') {
      return obj.data;
    } else if (obj.type === 'fetch') {
      if (this.cache[key]) return this.cache[key];
      let fetched = null;
      if (!this.failedGroups[obj.group]) {
        try {
          fetched = await this._fetchWithTimeout(obj.url);
        } catch (e) {
          if (obj.group) this.failedGroups[obj.group] = true;
        }
      }
      this.cache[key] = fetched;
      return fetched;
    }
  }

  async get(key, path = '') {
    const data = await this._getDataFromKey(key);
    if (path) {
      return this._getDataFromPath(data, path);
    }
    return data;
  }
}
