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
}


const topicService = new TopicService();
export default topicService;