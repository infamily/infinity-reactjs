import axios from 'axios';
import server from '../../../services/server.service';

async function getUserData(email, token) {
  const headers = { 'Authorization': 'Token ' + token };
  const { data } = await axios.get(server.otp_api + '/rest-auth/user/', { params: { email }, headers });
  return data;
}

async function userLogin(password, token) {
  const headers = { 'Authorization': 'Token ' + token };
  await axios.post(server.otp_api + '/otp/login/', { password }, { headers });
}

async function signUp(params) {
  const { data } = await axios.post(server.otp_api + '/otp/singup/', params);
  return data;
}

async function getCaptcha() {
  const { data } = await axios.get(server.otp_api + '/otp/singup/');
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