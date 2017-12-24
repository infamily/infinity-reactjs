import axios from 'axios';

class ServerService {
  constructor() {
    // this.api = 'https://inf.li/api/v1';
    // this.otp_api = 'https://inf.li';
    // this.index = 0;

    this.api_servers = [
      'https://inf.li',
      'https://test.wfx.io',
      'https://test.wefindx.io'
    ];

    this.loadStorage();
  }

  loadStorage() {
    const raw = localStorage['state_if'];
    if(!raw) return;
    
    const server = JSON.parse(raw).server;
    this.setDefault(server);
  }

  getDefault() {
    const promises = this.api_servers.map((api, i) => (
      this.getResponse(api, i)
    ));

    return Promise.race(promises);
  }

  getResponse = (api, index) => {
    return new Promise(function (resolve, reject) {
      axios.get(api).then(() => resolve(index));
    });
  }
  
  changeServer(num) {
    const { api_servers } = this;

    if (num < 0 || num > api_servers.length) return;
    this.setDefault(num);
  }
  
  setDefault = (num) => {
    const api = this.api_servers[num];

    this.index = num;
    this.api = api + '/api/v1';
    this.otp_api = api;
  }
}

const serverService = new ServerService();
export default serverService;
