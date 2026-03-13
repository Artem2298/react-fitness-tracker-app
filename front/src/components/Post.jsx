import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getAllUsers } from '@/services/userService';
import { getPublicTrainings } from '@/services/trainingService';
import { getTrainingType } from '@/lib/constants';
import Spinner from '@/components/ui/spinner';

export default function Post() {
  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [usersData, trainingsData] = await Promise.all([
          getAllUsers(),
          getPublicTrainings(),
        ]);

        setUsers(usersData);
        setTrainings(trainingsData);
      } catch (err) {
        console.error("Chyba při načítání dat:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <Spinner text="Načítání tréninků..." />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.isArray(users) && users
        .filter(user => trainings.some(t => t.user_id === user.id))
        .map(user => {
          const userTrainings = trainings.filter(t => t.user_id === user.id);

          return (
            <Card key={user.id} className="bg-gray-800/80 text-white border-gray-700 hover:border-gray-600 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">
                    {user.first_name?.[0]}{user.last_name?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {userTrainings.map((t) => {
                    const typeInfo = getTrainingType(t.type);
                    return (
                      <div key={t.id} className="flex items-center justify-between bg-gray-900/50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.color}`}>
                            {typeInfo.label}
                          </span>
                          <span className="text-sm font-medium">{t.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{t.distance} km</span>
                          <span>{t.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}