import configs from 'configs';

export const badgeStyle = (topic) => {
  const { children, parents, type } = topic;
  const color = configs.colors[type];
  const empty = '#bfbfbf';

  const node = () => {
    if (parents.length && children.length) return 3; // has all
    if (parents.length) return 2; // has only parents
    if (children.length) return 1; // has only children
    return 0; // no leafs
  }

  switch(node()) {
    case 2: 
      return {
        background: `linear-gradient(
          to bottom,
          ${color} 0%,
          ${color} 50%,
          ${empty} 50%,
          ${empty} 100%
        )`,
      }
    case 1: 
      return {
        background: `linear-gradient(
          to top,
          ${color} 0%,
          ${color} 50%,
          ${empty} 50%,
          ${empty} 100%
        )`,
      }
    default:
      return {
        backgroundColor: color,
      }
  }
};