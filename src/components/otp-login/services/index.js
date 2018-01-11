import axios from 'axios';
import server from '../../../services/server.service';

async function userLogin(params) {
  const { data } = await axios.post(server.base + '/signin/', params);
  return data;
}

async function signUp(params) {
  const { data } = await axios.post(server.base + '/signup/', params);
  return data;
}

async function getCaptcha() {
  const { data } = await axios.get(server.base + '/captcha/');
  return data;
}

function getImage(data) {
  const url = server.server + data['image_url'];
  return url;
}

export default {
  userLogin,
  signUp,
  getCaptcha,
  getImage,
}
