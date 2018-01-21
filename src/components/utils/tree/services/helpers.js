export function formatData(data) {
  const children = data.map(item => ({ title: item.title }));
  return children;
}