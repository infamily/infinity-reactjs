import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

class CommentService {

  async createComment(url, text, token) {
    const lang = langService.current;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        topic: url,
        text: '.:'+lang+'\n'+text,
        languages: [lang],
      }; 

      const { data } = await axios.post(serverService.api + '/comments/', parameters, { headers });
      data.text = text;

      return data;
    } catch(e) {
      console.error(e);
    } 
  }
  
  async updateComment(id, text, token) {
    const lang = langService.current;
    try {
      const headers = { 'Authorization': 'Token ' + token };
      const parameters = {
        text: '.:'+lang+'\n'+text,
        languages: [lang],
      }; 

      const { data } = await axios.patch(`${serverService.api}/comments/${id}/`, parameters, { headers });
      data.text = text;

      return data;
    } catch(e) {
      console.error(e);
    } 
  }
  
  async getComment(id) {
    const lang = langService.current;
    try {
      const { data } = await axios.get(`${serverService.api}/comments/${id}/?lang=${lang}`);
      return data;
    } catch(e) {
      console.error(e);
    } 
  }

  async deleteComment(id, token) {
    try {
      const headers = { 'Authorization': 'Token ' + token }; 
      await axios.delete(`${serverService.api}/comments/${id}/`, { headers });
      return 'success';
    } catch(e) {
      console.error(e);
    }
  }
}

const commentService = new CommentService();
export default commentService;