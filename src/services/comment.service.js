import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class CommentService {
  constructor() {
    this.api = configs.api;
  }

  async createTopic(topic, text, owner, token) {
    const lang = langService.current;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        topic: topic,
        text: '.:'+lang+'\n'+text,
        owner: owner,
        languages: [lang],
      }; 
      await axios.post(this.api + '/comments/', parameters, { headers });
      return 'success';
    } catch(e) {
      console.error(e);
    }

  }
}

const commentService = new CommentService();
export default commentService;