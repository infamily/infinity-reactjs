import configs from 'configs';

export const badgeStyle = topic => {
  const { type } = topic;
  const color = configs.colors[type];

  return {
    backgroundColor: color
  };
};

export const getBorder = topic => {
  const { type } = topic;
  const color = configs.colors[type];

  return {
    borderLeft: '2px dotted ' + color
  };
};
