export const TRAINING_TYPES = {
  RUN: { label: 'Běh', color: 'bg-green-500/20 text-green-400', icon: '🏃' },
  WALK: { label: 'Chůze', color: 'bg-blue-500/20 text-blue-400', icon: '🚶' },
  BIKE: { label: 'Kolo', color: 'bg-yellow-500/20 text-yellow-400', icon: '🚴' },
  SWIM: { label: 'Plavání', color: 'bg-cyan-500/20 text-cyan-400', icon: '🏊' },
  SKI: { label: 'Lyžování', color: 'bg-purple-500/20 text-purple-400', icon: '⛷️' },
};

export function getTrainingType(type) {
  return TRAINING_TYPES[type] || { label: type, color: 'bg-gray-500/20 text-gray-400', icon: '💪' };
}
