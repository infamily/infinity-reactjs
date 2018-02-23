import axios from 'axios';

class ServerService {
  constructor() {
    this.api = null;

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
    const url = 'https://' + server;

    // check if is known
    const index = this.api_servers.indexOf(url);
    if (index > -1) {
      this.setDefault(url);
      return url;
    }

    // check if is valid
    const isValid = await this.checkIsServerAvailable(url);
    if (isValid) {
      this.setDefault(url);
      return url;
    }
    
    return null;
  }

  async checkIsServerAvailable(url) {
    const noToken = axios.create();
    try {
      const { data } = await noToken.get(url);
      const isInfinity = data.slice(0, 300).includes('Infinity API');
      return isInfinity;
    } catch (error) {
      return false;
    }
  }
  
  setDefault = (server) => {
    this.api = server;
  }
}

const serverService = new ServerService();
export default serverService;
