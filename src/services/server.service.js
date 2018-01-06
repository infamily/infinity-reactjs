import axios from 'axios';

class ServerService {
  constructor() {
    this.api = null;
    this.otp_api = null;
    this.index = null;

    this.api_servers = [
      'https://test.wfx.io',
      'https://test.wefindx.io',
      'https://dev.wfx.io',
    ];

    this.getDefault();
  }

  async getDefault() {
    const raw = localStorage['state_if'];
    this.isLocal();

    if (!raw) {
      await this.getFastest();
      return;
    };
    
    const { server } = JSON.parse(raw);
    this.setDefault(server);
  }

  isLocal = () => {
    const isLocal = window.location.hostname === 'localhost';
    const server = 'http://0.0.0.0:8000';
    const isIncluded = this.api_servers.indexOf(server) > -1;
    if (isLocal && !isIncluded) this.api_servers.push(server);    
  }

  getFastest = async () => {
    const promises = this.api_servers.map((api, i) => (
      this.getResponse(api, i)
    ));

    const first = await Promise.race(promises);
    this.setDefault(2); // set temporary dev server 
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
