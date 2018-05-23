import configs from 'configs';

export const badgeStyle = type => ({
  backgroundColor: configs.colors[type]
});

export const getColor = topic => configs.colors[topic.type];

import configs from 'configs';

export const badgeStyle = type => ({
  backgroundColor: configs.colors[type]
});

export const getColor = topic => configs.colors[topic.type];

export function getCategories(topic) {
  if (!topic.categories.length) return []; // no categories

  const categoriesWithNames = topic.categories.map((url, index) => {
    const id = url.match(/types\/(.*)\//)[1]; // get user id

    return {
      name: topic.categories_names[index],
      url,
      id
    };
  });

  return categoriesWithNames;
}
