import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

class TopicService {
  constructor() {
    this.topics = [];
    this.fromPage = 0; 
  }

  setTopics(flag) {
    const self = this;
    const f = flag || '';

    return new Promise((resolve, reject) => {
      axios.get(`${serverService.api}/topics/?lang=${langService.current}&type=${f}`)
      .then(function (response) {  
        self.topics = response.data.results;
        self.fromPage = 1;        
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
    });
  }

  getPage(page, flag) {
    const self = this;
    const f = flag || '';
    return new Promise((resolve, reject) => {
      axios.get(`${serverService.api}/topics/?page=${page}&lang=${langService.current}&type=${f}`)
      .then(function (response) {  
        self.fromPage = page;
        self.topics = response.data.results;
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
    });
  }

  search(query, flag) {
    const self = this;
    const f = flag || '';

    return new Promise((resolve, reject) => {
      axios.get(`${serverService.api}/topics/?search=${query}&lang=${langService.current}&type=${f}`)
      .then(function (response) {  
        self.topics = response.data.results;
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
    });
  }

  async getTopic(id) {
    try {
      const getTopic = lang => axios.get(`${serverService.api}/topics/${id}/?lang=${lang || ''}`);
      const _topic = await getTopic(' ');
      
      const { current } = langService;
      const { languages } = _topic.data;

      const index = languages.indexOf(current);
      const lang = languages[index > -1 ? index : 0];
      
      const { data } = await getTopic(lang);
      data.lang = lang;
      return data;
    } catch(e) {
      console.error(e);
    }
  }

  getComments(id, lang) { 
    return new Promise((resolve, reject) => {
      axios.get(`${serverService.api}/comments/?topic=${id}&lang=${lang}`)
      .then(function (response) {
        resolve(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
        reject(error);
      });
    });
  }

  async getCategory(id) {
    try {
      const getCategory = lang => axios.get(`${serverService.api}/types/${id}/?lang=${lang || ''}`);
      const _category = await getCategory(' ');
  
      const { current } = langService;
      const { languages } = _category.data;
  
      const index = languages.indexOf(current);
      const lang = languages[index > -1 ? index : 0];
  
      const { data } = await getCategory(lang);
      data.lang = lang;
      return data;
    } catch (e) {
      console.error(e);
    }
  }
}


const topicService = new TopicService();
export default topicService;