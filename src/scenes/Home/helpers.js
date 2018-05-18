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
