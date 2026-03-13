import api from '@/lib/api';

export async function getUserTrainings(userId) {
  const { data } = await api.get(`/training/user/${userId}`);
  return data;
}

export async function getPublicTrainings() {
  const { data } = await api.get('/training/public');
  return data;
}

export async function createTraining(trainingData) {
  const { data } = await api.post('/training', trainingData);
  return data;
}

export async function deleteTraining(id) {
  const { data } = await api.delete(`/training/${id}`);
  return data;
}
