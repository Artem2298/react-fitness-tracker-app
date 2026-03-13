import { Card, CardContent } from '@/components/ui/card';
import { getTrainingType } from '@/lib/constants';

export default function TrainingCard({ training }) {
  const typeInfo = getTrainingType(training.type);

  return (
    <Card className="bg-gray-800/80 text-white border-gray-700 hover:border-gray-600 transition-colors">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-lg font-semibold">{training.title}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium mt-1 ${typeInfo.color}`}>
              {typeInfo.icon} {typeInfo.label}
            </span>
          </div>
          {training.is_public && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
              Veřejný
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold">{training.distance}</p>
            <p className="text-xs text-gray-500">km</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 text-center">
            <p className="text-lg font-bold">{training.duration}</p>
            <p className="text-xs text-gray-500">min</p>
          </div>
        </div>
        {training.description && (
          <p className="text-sm text-gray-400 mt-3">{training.description}</p>
        )}
      </CardContent>
    </Card>
  );
}
