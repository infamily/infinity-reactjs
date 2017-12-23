<<<<<<< HEAD
import axios from 'axios';
=======
import { loadState } from '../store/localStorage';

const persistedState = loadState();

>>>>>>> 81a54ba0129bb6f1b922cac578502338e6150380

class ServerService {
  constructor() {
    this.api = 'https://inf.li/api/v1';
    this.otp_api = 'https://inf.li';
    this.index = 0;

    this.api_servers = [
      'https://inf.li',
      'https://test.wfx.io',
      'https://test.wefindx.io'
    ];
  }

  getDefault() {
    const promises = this.api_servers.map((api, i) => (
      this.getResponse(api, i)
    ));

    return Promise.race(promises);
  }

  getResponse(api, index) {
    return new Promise(function (resolve, reject) {
      axios.get(api).then(() => resolve(index));
    });
  }
  
  changeServer(num) {
    const { api_servers } = this;

    if (num < 0 || num > api_servers.length) return;
    const api = api_servers[num];
    
    this.api = api + '/api/v1';
    this.otp_api = api;
    this.index = num;
  }
}

const serverService = new ServerService();
export default serverService;
