import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

// getCatergoryString returns a category query string for requests
const getCatergoryString = array =>
  array.reduce(
    (accumulator, value) => `${accumulator}&categories=${value}`,
    ''
  );

const getParams = (
  flag,
  view,
  categories,
  parentsById,
  childrenById,
  query
) => {
  const f = flag || '';
  const categoryParams = categories ? getCatergoryString(categories) : '';
  const viewParam = parseInt(view, 10) ? `&parents__isnull=${view}` : '';
  let params = `lang=${
    langService.current
  }&type=${f}&type__not=0${viewParam}${categoryParams}`;

  if (parentsById) params += `&children=${parentsById}`;
  if (childrenById) params += `&parents=${childrenById}`;
  if (query) params += `&search=${query}`;

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

  async getTopics(...args) {
    const { data, error } = await serverService.get(
      `/topics/?${getParams(...args)}`
    );
    if (data) {
      this.topics = data.results;
      this.fromPage = 1;
      return data;
    }
    logger(error);
    return null;
  }

  async getPage(page, ...args) {
    const { data, error } = await serverService.get(
      `/topics/?page=${page}&${getParams(...args)}`
    );
    if (data) {
      this.fromPage = page;
      this.topics = data.results;
      return data.results;
    }
    logger(error);
    return null;
  }

  async search(query, ...args) {
    const { data, error } = await serverService.get(
      `/topics/?search=${query}&${getParams(...args)}`
    );
    if (data) {
      this.topics = data.results;
      return data;
    }
    logger(error);
    return null;
  }

  getTopic = async id => {
    try {
      const axiosNoToken = axios.create();
      const getApi = () => serverService.api;
      const getTopicByLang = lang =>
        axiosNoToken.get(`${getApi()}/topics/${id}/?lang=${lang || ''}`);
      const _topic = await getTopicByLang(' ');

      const { current } = langService;
      const { languages } = _topic.data;

      const index = languages.indexOf(current);
      const lang = languages[index > -1 ? index : 0];

      const { data } = await getTopicByLang(lang);
      data.lang = lang;
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  getTopicSource = async id => {
    try {
      const axiosNoToken = axios.create();
      const { data } = await axiosNoToken.get(
        `${serverService.api}/topics/${id}/`
      );
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
