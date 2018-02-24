import configs from 'configs';

export const badgeStyle = (type) => {
  return {
    backgroundColor: configs.colors[type]
  }
};