import axios from 'axios';

class ServerService {
  constructor() {
    this.api = null;
    this.paymentAuthorization = null;

    this.api_servers = ['https://wefindx.io', 'https://inf.wefindx.com'];

    // this.getDefault();
  }

  async getDefault() {
    const raw = localStorage.state_if;
    const server = raw && JSON.parse(raw).server;

    if (!server) {
      await this.getFastest();
      return;
    }

    this.isLocal(); // add local server in sandbox mode
    this.setDefault(server);
  }

  isLocal = () => {
    const isLocal = window.location.hostname === 'localhost';
    const server = 'http://0.0.0.0:8000';
    const isIncluded = this.api_servers.indexOf(server) > -1;
    if (isLocal && !isIncluded) this.api_servers.push(server);
  };

  getFastest = async () => {
    const promises = this.api_servers.map(api => this.getResponse(api));

    const first = await Promise.race(promises);

    this.setDefault(first);
    return first;
  };

  getResponse = async api => {
    await axios.get(`${api}/signature/`);
    return api;
  };

  changeServer(server) {
    const index = this.api_servers.indexOf(server);
    if (index < 0) return;
    this.setDefault(server);
  }

  changeServerByLink = async server => {
    const url = `https://${server}`;

    // check if is known
    const index = this.api_servers.indexOf(url);
    if (index > -1) {
      this.setDefault(url);
      return url;
    }

    // check if is valid
    const isValidServer = await this.checkIsServerAvailable(url);
    if (isValidServer) {
      this.setDefault(url);
      return url;
    }

    // check if is organization
    const organizationServer = await this.checkOrganization(server);
    if (organizationServer) {
      this.setDefault(organizationServer);
      return organizationServer;
    }

    return null;
  };

  async checkOrganization(server) {
    const url = `https://inf.${server}`;
    const isValidServer = await this.checkIsServerAvailable(url);
    const link = isValidServer ? url : null;
    return link;
  }

  checkIsServerAvailable = async url => {
    const noToken = axios.create();
    try {
      const { data } = await noToken.get(`${url}/signature/`);
      const isInfinity = data && data.service === 'infinity';

      return isInfinity;
    } catch (error) {
      return null;
    }
  };

  setDefault = server => {
    this.api = server;
    this.paymentAuthorization = null;
  };

  getPaymentAuthorization = async () => {
    if (this.paymentAuthorization === null) {
      // this.paymentAuthorization = await this.get('/get-url');
      return true;
    }

    return this.paymentAuthorization;
  };

  get = async url => {
    try {
      const { data } = await axios.get(this.api + url);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };
}

const serverService = new ServerService();
export default serverService;
