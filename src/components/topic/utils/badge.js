import configs from '../../../configs';

export default (type) => {
  return {
    backgroundColor: configs.colors[type]
  }
};