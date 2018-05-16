import axios from 'axios';
import langService from 'services/lang.service';
import serverService from 'services/server.service';
import topicService from 'services/topic.service';

const axiosNoToken = axios.create(); // to get data from other servers

const getTopic = async id => topicService.getTopic(id);

async function getChildren(id, lang) {
  try {
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/topics/?parents=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getParents(id, lang) {
  try {
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/topics/?children=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getComments(id, lang) {
  try {
    const api = serverService.api;
    const { data } = await axiosNoToken.get(
      `${api}/comments/?topic=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

export default {
  getComments,
  getTopic,
  getChildren,
  getParents
};
