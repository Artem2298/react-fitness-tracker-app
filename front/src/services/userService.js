import api from '@/lib/api';

export async function getUser(userId) {
  const { data } = await api.get(`/users/${userId}`);
  return data;
}

export async function getAllUsers() {
  const { data } = await api.get('/users');
  return data;
}

export async function getFollowedUsers(userId) {
  const { data } = await api.get(`/follows/${userId}/following`);
  return data.following;
}
