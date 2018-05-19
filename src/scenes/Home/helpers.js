// makeCategoriesArray convert select objects to an ids array
export function makeCategoriesArray(categories) {
  const array = categories.map(item => {
    const id = item.url.match(/types\/(.*)\//)[1];
    return id;
  });

  return array;
}

export function getQueryParameters(search) {
  if (!search) return {};

  const params = search.substring(1);
  return JSON.parse(
    '{"' +
      decodeURI(params)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

// validateCategoryString parses a string to an array of numbers
export const validateCategoryString = str => {
  const array = str.split(',');
  return array
    ? array.map(item => parseInt(item)).filter(item => !isNaN(item))
    : [];
};
