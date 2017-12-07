import configs from '../configs';

class ServerService {
  constructor() {

  }

  changeServer(num) {
    const api_servers = [
      'https://test.wfx.io',
      'https://test.wefindx.io'
    ];

    if (num < 0 || num > api_servers.length) return;
    const api = api_servers[num];

    configs.api = api + '/api/v1';
    configs.otp_api = api;
  }
}

const serverService = new ServerService();
export default serverService;