import { useEffect, useState, useCallback } from 'react';
import { getUserTrainings, createTraining, deleteTraining } from '@/services/trainingService';

export default function useTrainings(userId) {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(() => {
    if (!userId) return;
    setLoading(true);
    setError(null);

    getUserTrainings(userId)
      .then(setTrainings)
      .catch((err) => setError(err.response?.data?.error || 'Nepodařilo se načíst tréninky'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  const add = useCallback(async (data) => {
    const newTraining = await createTraining(data);
    setTrainings((prev) => [...prev, newTraining]);
    return newTraining;
  }, []);

  const remove = useCallback(async (id) => {
    await deleteTraining(id);
    setTrainings((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { trainings, loading, error, reload: load, add, remove };
}
