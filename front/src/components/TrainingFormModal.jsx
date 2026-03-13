import { TRAINING_TYPES } from '@/lib/constants';
import ErrorMessage from '@/components/ui/error-message';

export default function TrainingFormModal({
  formData,
  errors,
  submitError,
  seconds,
  onChange,
  onCancel,
  onSave,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
        <h2 className="text-xl font-bold mb-1 text-white">Nový trénink</h2>
        <p className="text-sm text-gray-400 mb-5">Vyplň údaje o tréninku</p>

        {submitError && <ErrorMessage message={submitError} />}

        <div className="space-y-4 mt-4">
          <Field label="Název" required error={errors.title}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Např. Ranní běh"
              className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Typ" required error={errors.type}>
            <select
              name="type"
              value={formData.type}
              onChange={onChange}
              className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
            >
              {Object.entries(TRAINING_TYPES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </Field>

          <Field label="Vzdálenost (km)" required error={errors.distance}>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={onChange}
              step="0.1"
              placeholder="0.0"
              className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
            />
          </Field>

          <Field label="Doba" error={errors.duration}>
            <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 text-center">
              <p className="text-2xl font-mono font-bold text-orange-400">
                {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
              </p>
              <p className="text-xs text-gray-500 mt-1">min : sec</p>
            </div>
          </Field>

          <Field label="Popis">
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Volitelný popis tréninku..."
              className="w-full p-2.5 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none transition-colors"
              rows="2"
            />
          </Field>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_public"
              checked={formData.is_public}
              onChange={onChange}
              className="w-4 h-4 rounded border-gray-600 accent-orange-500"
            />
            <span className="text-sm text-gray-300">Veřejný trénink</span>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-600 transition-colors"
          >
            Zrušit
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-4 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
          >
            Uložit trénink
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-1">
        {label}{required && '*'}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
