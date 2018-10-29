import axios from 'axios';
import langService from './lang.service';
import serverService from './server.service';

class TopicViewService {
  constructor() {
    this.categoriesByLang = {
      [langService.current]: null
    };
  }

  createTopic = async data => {
    const lang = langService.current;
    const {
      type,
      title,
      text,
      parents,
      categories,
      showcase_data,
      is_draft,
      blockchain
    } = data;
    try {
      const parameters = {
        title: `.:${lang}:${title}`,
        body: `.:${lang}\n${text}`,
        languages: [lang],
        type,
        parents,
        categories,
        data: showcase_data,
        is_draft,
        blockchain
      };

      const { data } = await axios.post(
        `${serverService.api}/topics/`,
        parameters
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  updateTopic = async data => {
    const lang = langService.current;
    const {
      type,
      title,
      text,
      parents,
      categories,
      id,
      is_draft,
      showcase_data,
      blockchain
    } = data;
    try {
      const parameters = {
        title: `.:${lang}:${title}`,
        body: `.:${lang}\n${text}`,
        languages: [lang],
        type,
        parents,
        categories,
        data: showcase_data,
        blockchain,
        is_draft
      };

      const { data } = await axios.patch(
        `${serverService.api}/topics/${id}/`,
        parameters
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  partialUpdateTopic = async (id, parameters) => {
    try {
      const { data } = await axios.patch(
        `${serverService.api}/topics/${id}/`,
        parameters
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  createTopicSource = async data => {
    const {
      type,
      title,
      text,
      parents,
      categories,
      showcase_data,
      is_draft
    } = data;
    try {
      const parameters = {
        title,
        body: text,
        type,
        parents,
        data: showcase_data,
        categories,
        is_draft
      };

      const { data } = await axios.post(
        `${serverService.api}/topics/`,
        parameters
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  updateTopicSource = async data => {
    const {
      type,
      title,
      text,
      parents,
      categories,
      id,
      showcase_data,
      is_draft
    } = data;
    try {
      const parameters = {
        title,
        body: text,
        languages: [],
        type,
        parents,
        data: showcase_data,
        categories,
        is_draft
      };

      const { data } = await axios.patch(
        `${serverService.api}/topics/${id}/`,
        parameters
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  deleteTopic = async id => {
    try {
      await axios.delete(`${serverService.api}/topics/${id}/`);
      return 'success';
    } catch (e) {
      console.error(e);
    }
  };

  search = async (query, flag) => {
    const { current } = langService;
    const f = flag || '';

    try {
      const { data } = await axios.get(
        `${serverService.api}/topics/?search=${query}&lang=${current}&type=${f}`
      );
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  getCategories = async () => {
    const { current } = langService;
    const categories = this.categoriesByLang[current];
    if (categories) return categories;

    try {
      const res = await axios.get(
        `${serverService.api}/types/?category=1&is_category=1&lang=${current}` // &parents__isnull=1
      );

      this.categoriesByLang[current] = res.data;
      return res.data;
    } catch (e) {
      console.error(e);
    }
  };

  getCategoriesByIds = async categoryIds => {
    const allCategories = await this.getCategories();
    const formatted = categoryIds.map(id => {
      const categoryObject = allCategories.find(category =>
        category.url.includes(id)
      );
      const { name, url, definition } = categoryObject;
      return { label: name, value: name, url, definition };
    });
    return formatted;
  };

  getSubCategoriesById = async id => {
    try {
      const { current } = langService;
      const categories = await axios.get(
        `${
          serverService.api
        }/types/?is_category=1&parents=${id}&lang=${current}`
      );
      return categories.data;
    } catch (e) {
      console.error(e);
    }
  };
}

const topicViewService = new TopicViewService();
export default topicViewService;
