// makeCategoriesArray convert select objects to an ids array
export function makeCategoriesArray(categories) {
  if (!categories || !categories.length) return [];

  const array = categories.filter(item => item.url).map(item => {
    const id = item.url.match(/types\/(.*)\//)[1];
    return id;
  });

  return array;
}

// parse search string to object
export function parseSearchParameters(search) {
  if (!search) return {};

  const params = search.substring(1);
  return JSON.parse(
    `{"${decodeURI(params)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
}

// validateCategoryString parses a string to an array of numbers
export const validateCategoryString = str => {
  const array = str.split(',');
  return array
    ? array.map(item => parseInt(item, 10)).filter(item => !isNaN(item))
    : [];
};

const validateSearchParams = obj => {
  const {
    flag,
    topicSource,
    view,
    categories,
    query,
    parentsById,
    childrenById
  } = obj;
  const params = {};

  if (flag) {
    const flagParam = parseInt(flag, 10);
    const isValid = !isNaN(flagParam) && flagParam < 6 && flagParam >= 0;
    if (isValid) params.flag = flagParam;
  }

  if (parentsById) {
    const parentsByIdParam = parseInt(parentsById, 10);
    const isValid = !isNaN(parentsByIdParam) && parentsByIdParam > 0;
    if (isValid) params.parentsById = parentsByIdParam;
  }

  if (childrenById) {
    const childrenByIdParam = parseInt(childrenById, 10);
    const isValid = !isNaN(childrenByIdParam) && childrenByIdParam > 0;
    if (isValid) params.childrenById = childrenByIdParam;
  }

  if (topicSource) {
    const sourceNum = parseInt(topicSource, 10);
    if (sourceNum === 1 || sourceNum === 0) params.topicSource = sourceNum;
  }

  if (view) {
    if (view === 'grid' || view === 'line') params.view = view;
  }

  if (categories) {
    const categoryParam = validateCategoryString(categories);
    if (categoryParam.length) params.categories = categoryParam;
  }

  if (query) params.query = query;

  return params;
};

// returns valid params or null
export const validateHomeParams = search => {
  const searchParams = parseSearchParameters(search);
  const validParams = validateSearchParams(searchParams);
  const homeParams = Object.keys(validParams).length ? validParams : null;
  return homeParams;
};
