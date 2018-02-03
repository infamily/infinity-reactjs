import configs from '../../../../configs';
const { colors } = configs;

export const badgeStyle = (topic) => {
  const { children, parents, type } = topic;
  const color = colors[type];
  const empty = '#bfbfbf';

  const node = () => {
    if (children.length && parents.length) return 3; // has all
    if (children.length) return 2; // has only children
    if (parents.length) return 1; // has only parents
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