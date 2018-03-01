import configs from 'configs';

export const badgeStyle = (topic) => {
  const { type } = topic;
  const color = configs.colors[type];
  
  return {
    backgroundColor: color,
  }
};