import axios from 'axios';
import server from '../../../services/server.service';

async function getUserData(email, token) {
  const headers = { 'Authorization': 'Token ' + token };
  const { data } = await axios.get(server.otp_api + '/rest-auth/user/', { params: { email }, headers });
  return data;
}

async function userLogin(params, token) {
  const headers = { 'Authorization': 'Token ' + token };
  const { data } = await axios.post(server.api + '/auth/signin/', params, { headers });
  console.log(data)
}

async function signUp(params) {
  const { data } = await axios.post(server.api + '/auth/signup/', params);
  return data;
}

async function getCaptcha() {
  const { data } = await axios.get(server.api + '/auth/captcha/');
  return data;
}

function getImage(data) {
  const url = server.otp_api + data['image_url'];
  return url;
}

export default {
  getUserData,
  userLogin,
  signUp,
  getCaptcha,
  getImage,
}