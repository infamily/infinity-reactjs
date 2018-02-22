import axios from 'axios';

class ServerService {
  constructor() {
    this.api = null;
    this.index = null;

    this.api_servers = [
      'https://test.wefindx.io',
      'https://test.wfx.io',
      'https://lt.wfx.io',
    ];
    
    this.getDefault();
  }

  async getDefault() {
    const raw = localStorage['state_if'];
    const server = raw && JSON.parse(raw).server;
    
    if (!server) {
      await this.getFastest();
      return;
    };
    
    this.isLocal(); // add local server in sandbox mode
    this.setDefault(server);
  }

  isLocal = () => {
    const isLocal = window.location.hostname === 'localhost';
    const server = 'http://0.0.0.0:8000';
    const isIncluded = this.api_servers.indexOf(server) > -1;
    if (isLocal && !isIncluded) this.api_servers.push(server);    
  }

  getFastest = async () => {
    const promises = this.api_servers.map((api) => (
      this.getResponse(api)
    ));

    const first = await Promise.race(promises);
    this.setDefault(first);
  }

  getResponse = (api) => {
    return new Promise((resolve) => {
      axios.get(api).then(() => resolve(api));
    });
  }
  
  changeServer(server) {
    const index = this.api_servers.indexOf(server);
    if (index < 0) return;
    this.setDefault(server);
  }
  
  changeServerByLink = async (server) => {
    const isValid = await this.checkIsServerAvailable(server);
    if (isValid) return server;
    return null;
  }

  async checkIsServerAvailable(server) {
    const url = 'https://' + server;
    const noToken = axios.create();
    const data = await noToken.get(url);
    const isInfinity = JSON.stringify(data).includes('Infinity API');
    console.log('Infinity API', isInfinity, server);
    return isInfinity;
  }
  
  setDefault = (server) => {
    this.api = server;
  }
}

const serverService = new ServerService();
export default serverService;
