import configs from 'configs';

export const linkBase = configs.linkBase;

export const badgeStyle = (type) => {
  return {
    backgroundColor: configs.colors[type]
  }
};