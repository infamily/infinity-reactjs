import configs from 'configs';

export const badgeStyle = type => ({
  backgroundColor: configs.colors[type]
});

export const getColor = topic => configs.colors[topic.type];
