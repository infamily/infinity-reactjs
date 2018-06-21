import serverService from 'services/server.service';

export async function getUserBalance(id) {
  const { data, error } = await serverService.get('/user_balance/?id=' + id);
  return {
    data: data && data[0],
    error
  };
}
