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
    borderLeft: `2px dotted ${color}`
  };
};

export const getDraftStyle = (topic, user) => {
  if (!topic.is_draft) return '';
  if (!user) return 'topic_list__hide';

  const isOwner = topic.owner.username === user.username;
  return isOwner ? 'topic_list__draft' : 'topic_list__hide';
};

export const getTopicLink = id => `${configs.linkBase()}/split/topic/${id}`;
