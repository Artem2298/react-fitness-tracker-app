import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '../context/UserContext';

export default function TraningPage() {
    const user = useUser();
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function loadData() {
            try {
                const trainingsRes = await fetch(`http://localhost:3000/training/user/${user.id}`);
                const trainingsData = await trainingsRes.json();
                setTrainings(trainingsData);
            } catch (err) {
                console.error('Chyba při načítání tréninků:', err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    if (!user) return <p className="text-white">Načítání uživatele...</p>;
    if (loading) return <p className="text-white">Načítání tréninků...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-orange-500 p-8">Můj trénink</h1>
            <div className="space-y-4 pl-10 pr-10">
                <p className="text-lg font-semibold text-white">
                    {user.first_name} {user.last_name}
                </p>
                <p className="text-sm text-gray-400 mb-2">{user.email}</p>
                {trainings.length === 0 ? (
                    <p className="text-white">Žádné tréninky nebyly nalezeny.</p>
                ) : (
                    trainings.map(training => (
                        <Card key={training.id} className="bg-gray-900 text-white border-gray-700">
                            <CardContent className="p-4">
                                <p className="text-lg font-semibold">{training.title}</p>
                                <p className="text-sm text-gray-400 mb-2">Doba: {training.duration} min</p>
                                <p className="text-sm text-gray-400">Typ: {training.type}</p>
                                <p className="text-sm text-gray-400">Vzdálenost: {training.distance} km</p>
                                {training.description && (
                                    <p className="text-sm text-gray-400">Popis: {training.description}</p>
                                )}
                                <p className="text-sm text-gray-400">
                                    Veřejný: {training.is_public ? 'Ano' : 'Ne'}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}