import axios from 'axios';
import serverService from 'services/server.service';
import topicService from 'services/topic.service';

const axiosNoToken = axios.create(); // to get data from other servers

const getTopic = async id => topicService.getTopic(id);
const getApi = () => serverService.api;

async function getChildren(id, lang) {
  try {
    const { data } = await axiosNoToken.get(
      `${getApi()}/topics/?parents=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getParents(id, lang) {
  try {
    const { data } = await axiosNoToken.get(
      `${getApi()}/topics/?children=${id}&lang=${lang}`
    );
    return data.results;
  } catch (e) {
    console.error(e);
  }
}

async function getComments(id, lang) {
  try {
    const { data } = await axiosNoToken.get(
      `${getApi()}/comments/?topic=${id}&lang=${lang}`
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
