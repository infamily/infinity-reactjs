import axios from 'axios';
import server from '../../../services/server.service';

async function userLogin(params) {
  const { data } = await axios.post(server.api + '/signin/', params);
  return data;
}

async function signUp(params) {
  const { data } = await axios.post(server.api + '/signup/', params);
  return data;
}

async function getCaptcha() {
  const { data } = await axios.get(server.api + '/captcha/');
  return data;
}

function getImage(data) {
  const url = server.api + data['image_url'];
  return url;
}

export default {
  userLogin,
  signUp,
  getCaptcha,
  getImage,
}
