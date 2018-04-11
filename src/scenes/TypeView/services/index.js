import langService from 'services/lang.service';
import serverService from 'services/server.service';

export async function getType(id) {
  const lang = langService.current;
  const { data } = await serverService.get(`/types/${id}/?lang=${lang}`);
  return data;
}