import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

export default function Post() {
  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const usersRes = await fetch('http://localhost:3000/users');
        const trainingsRes = await fetch('http://localhost:3000/training/public');

        const usersData = await usersRes.json();
        const trainingsData = await trainingsRes.json();

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

  if (loading) return <p className="text-white">Načítání dat...</p>;

  return (
    <div className="space-y-4 pl-10 pr-10">
      {Array.isArray(users) && users
        .filter(user => trainings.some(t => t.user_id === user.id))
        .map(user => {
          const userTrainings = trainings.filter(t => t.user_id === user.id);

          return (
            <Card key={user.id} className="bg-gray-900 text-white border-gray-700">
              <CardContent className="p-4">
                <p className="text-lg font-semibold">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                <ul className="list-disc ml-6 text-sm">
                  {userTrainings.map((t, i) => (
                    <li key={i}>{t.title} – {t.duration} min</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
}