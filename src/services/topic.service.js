import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class TopicService {
  constructor() {
    this.topics = [];
    this.fromPage = 0;

    this.api = configs.api;
  }

  setTopics() {
    const self = this;
    return new Promise((resolve, reject) => {
      axios.get(`${this.api}/topics/?lang=${langService.current}`)
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

  getPage(page) {
    const self = this;
    
    return new Promise((resolve, reject) => {
      axios.get(`${this.api}/topics/?page=${page}&lang=${langService.current}`)
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

  search(query) {
    const self = this;
    return new Promise((resolve, reject) => {
      axios.get(`${this.api}/topics/?search=${query}&lang=${langService.current}`)
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

  getTopic(id) { 
    return new Promise((resolve, reject) => {
      axios.get(`${this.api}/topics/${id}/?lang=${langService.current}`)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.error(error);
        resolve(error)
      });
    });
  }

  getComments(id) { 
    return new Promise((resolve, reject) => {
      axios.get(`${this.api}/comments/?topic=${id}&lang=${langService.current}`)
      .then(function (response) {
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