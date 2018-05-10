import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

const getParams = (flag, view) => {
  const f = flag || '';
  const viewParam = view ? `&parents__isnull=${view}` : '';
  const params = `lang=${
    langService.current
  }&type=${f}&type__not=0${viewParam}`;
  return params;
};

const logger = err => {
  console.log(err);
};

class TopicService {
  constructor() {
    this.topics = [];
    this.fromPage = 0;
  }

  async getTopics(flag, view) {
    const { data, error } = await serverService.get(
      `/topics/?${getParams(flag, view)}`
    );
    if (data) {
      this.topics = data.results;
      this.fromPage = 1;
      return data.results;
    }
    logger(error);
  }

  async getPage(page, flag, view) {
    const { data, error } = await serverService.get(
      `/topics/?page=${page}&${getParams(flag, view)}`
    );
    if (data) {
      this.fromPage = page;
      this.topics = data.results;
      return data.results;
    }
    logger(error);
  }

  async search(query, flag, view) {
    const { data, error } = await serverService.get(
      `/topics/?search=${query}&${getParams(flag, view)}`
    );
    if (data) {
      this.topics = data.results;
      return data.results;
    }
    logger(error);
  }

  getTopic = async id => {
    try {
      const api = serverService.api;
      const axiosNoToken = axios.create();
      const getTopic = lang =>
        axiosNoToken.get(`${api}/topics/${id}/?lang=${lang || ''}`);
      const _topic = await getTopic(' ');

      const { current } = langService;
      const { languages } = _topic.data;

      const index = languages.indexOf(current);
      const lang = languages[index > -1 ? index : 0];

      const { data } = await getTopic(lang);
      data.lang = lang;
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  resetState = () => {
    this.fromPage = null;
    this.topics = [];
  };
}

const topicService = new TopicService();
export default topicService;
