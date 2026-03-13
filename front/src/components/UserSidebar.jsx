import { Card, CardContent } from '@/components/ui/card';

export default function UserSidebar({ user, trainings }) {
  return (
    <div className="w-full lg:w-80">
      <Card className="bg-gray-800/80 text-white border-gray-700 sticky top-24">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="rounded-full w-14 h-14" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-lg">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </div>
            )}
            <div>
              <h2 className="font-bold">{user.first_name} {user.last_name}</h2>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-3 space-y-2 text-sm text-gray-400">
            <p><strong className="text-gray-300">Narozeniny:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
            {user.bio && <p><strong className="text-gray-300">O mně:</strong> {user.bio}</p>}
            <p><strong className="text-gray-300">Člen od:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
          </div>

          <div className="border-t border-gray-700 pt-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-lg font-bold text-orange-400">{trainings.length}</p>
                <p className="text-[10px] text-gray-500 uppercase">Tréninky</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-lg font-bold text-orange-400">
                  {trainings.reduce((s, t) => s + t.distance, 0).toFixed(1)}
                </p>
                <p className="text-[10px] text-gray-500 uppercase">km</p>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-2">
                <p className="text-lg font-bold text-orange-400">
                  {trainings.reduce((s, t) => s + t.duration, 0).toFixed(0)}
                </p>
                <p className="text-[10px] text-gray-500 uppercase">min</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
