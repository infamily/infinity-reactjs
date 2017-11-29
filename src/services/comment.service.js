import axios from 'axios';
import langService from './lang.service';
import configs from '../configs';

class CommentService {
  constructor() {
    this.api = configs.api;
  }

  async createTopic(url, text, token) {
    const lang = langService.current;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        topic: url,
        text: '.:'+lang+'\n'+text,
        languages: [lang],
      }; 
      const { data } = await axios.post(this.api + '/comments/', parameters, { headers });
      return data;
    } catch(e) {
      console.error(e);
    }

  }

  async deleteTopic(id, token) {
    try {
      const headers = { 'Authorization': 'Token ' + token }; 
      await axios.delete(this.api+'/comments/'+id+'/', { headers });
      return 'success';
    } catch(e) {
      console.error(e);
    }
  }
}

const commentService = new CommentService();
export default commentService;