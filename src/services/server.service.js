import { loadState } from '../store/localStorage';

const persistedState = loadState();


class ServerService {
  constructor() {
    this.api = 'https://inf.li/api/v1';
    this.otp_api = 'https://inf.li';
    
    this.getDefault();
  }

  getDefault() {
    if (persistedState) {
      const serverNum = persistedState["server"];

      if (serverNum) {
        this.changeServer(serverNum);
      }
    }
  }

  changeServer(num) {
    const api_servers = [
      'https://inf.li',
      'https://test.wfx.io',
      'https://test.wefindx.io'
    ];

    if (num < 0 || num > api_servers.length) return;
    const api = api_servers[num];
    
    this.api = api + '/api/v1';
    this.otp_api = api;

    this.setDefault(num);
  }
  
  setDefault(num) {
    persistedState["server"] = num;
  }
}

const serverService = new ServerService();
export default serverService;
