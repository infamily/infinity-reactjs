import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class CommentService {
  constructor() {
    this.topics = [];
    this.fromPage = 0;

    this.api = configs.api;
  }

  createTopic(id, text, owner) {
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
}

const commentService = new CommentService();
export default commentService;