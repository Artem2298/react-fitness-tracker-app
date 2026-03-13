import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '../context/UserContext';
import useTrainings from '@/hooks/useTrainings';
import { getTrainingType } from '@/lib/constants';
import Spinner from '@/components/ui/spinner';
import ErrorMessage from '@/components/ui/error-message';

export default function UserProfile() {
    const user = useUser();
    const { trainings, loading, error, reload } = useTrainings(user?.id);

    if (!user) return <Spinner text="Načítání uživatele..." />;
    if (loading) return <Spinner text="Načítání profilu..." />;
    if (error) return <div className="py-8 max-w-3xl mx-auto"><ErrorMessage message={error} onRetry={reload} /></div>;

    const totalDistance = trainings.reduce((sum, t) => sum + t.distance, 0);
    const totalDuration = trainings.reduce((sum, t) => sum + t.duration, 0);

    const typeCounts = trainings.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="py-8 max-w-3xl mx-auto space-y-6">
            {/* Profile header */}
            <Card className="bg-gray-800/80 text-white border-gray-700">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt="Avatar" className="rounded-full w-24 h-24" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-3xl">
                                {user.first_name?.[0]}{user.last_name?.[0]}
                            </div>
                        )}
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
                            <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                            {user.bio && <p className="text-gray-300 mt-2 text-sm">{user.bio}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gray-800/80 text-white border-gray-700">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-orange-400">{trainings.length}</p>
                        <p className="text-xs text-gray-500 uppercase mt-1">Tréninky</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/80 text-white border-gray-700">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-orange-400">{totalDistance.toFixed(1)}</p>
                        <p className="text-xs text-gray-500 uppercase mt-1">km celkem</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-800/80 text-white border-gray-700">
                    <CardContent className="p-5 text-center">
                        <p className="text-3xl font-bold text-orange-400">{totalDuration.toFixed(0)}</p>
                        <p className="text-xs text-gray-500 uppercase mt-1">min celkem</p>
                    </CardContent>
                </Card>
            </div>

            {/* Activity by type */}
            {Object.keys(typeCounts).length > 0 && (
                <Card className="bg-gray-800/80 text-white border-gray-700">
                    <CardContent className="p-5">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-orange-500 rounded-full" />
                            Aktivity podle typu
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {Object.entries(typeCounts).map(([type, count]) => {
                                const typeInfo = getTrainingType(type);
                                return (
                                    <div key={type} className={`px-4 py-2 rounded-lg ${typeInfo.color} font-medium text-sm`}>
                                        {typeInfo.label}: {count}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Info */}
            <Card className="bg-gray-800/80 text-white border-gray-700">
                <CardContent className="p-5">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 bg-orange-500 rounded-full" />
                        Informace
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-900/50 rounded-lg p-3">
                            <p className="text-gray-500 text-xs uppercase">Narozeniny</p>
                            <p className="text-gray-300 mt-1">{new Date(user.birthday).toLocaleDateString()}</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-3">
                            <p className="text-gray-500 text-xs uppercase">Člen od</p>
                            <p className="text-gray-300 mt-1">{new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
