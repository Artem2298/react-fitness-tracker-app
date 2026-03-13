import { useState } from 'react';
import { useUser } from '../context/UserContext';
import useTrainings from '@/hooks/useTrainings';
import useTimer from '@/hooks/useTimer';
import { validateTraining } from '@/lib/validation';
import Spinner from '@/components/ui/spinner';
import ErrorMessage from '@/components/ui/error-message';
import TrainingCard from '@/components/TrainingCard';
import TrainingFormModal from '@/components/TrainingFormModal';
import UserSidebar from '@/components/UserSidebar';

const INITIAL_FORM = {
    title: '',
    type: 'RUN',
    distance: '',
    description: '',
    is_public: false,
};

export default function TrainingPage() {
    const user = useUser();
    const { trainings, loading, error, reload, add } = useTrainings(user?.id);
    const timer = useTimer();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const startTraining = () => {
        timer.start();
        setIsModalOpen(true);
    };

    const stopTraining = async () => {
        timer.stop();

        const validationErrors = validateTraining(formData, timer.seconds);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await add({
                ...formData,
                user_id: user.id,
                duration: timer.seconds / 60,
            });
            setIsModalOpen(false);
            resetForm();
        } catch (err) {
            console.error('Error saving training:', err);
            setSubmitError(err.response?.data?.error || 'Nepodařilo se uložit trénink');
        }
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM);
        setErrors({});
        setSubmitError('');
        timer.reset();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    if (!user) return <Spinner text="Načítání uživatele..." />;
    if (loading) return <Spinner text="Načítání tréninků..." />;

    return (
        <div className="flex flex-col lg:flex-row py-8 gap-8">
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="w-1 h-6 bg-orange-500 rounded-full" />
                        Moje tréninky
                    </h1>
                    <button
                        onClick={startTraining}
                        className="px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                    >
                        + Nový trénink
                    </button>
                </div>

                {(submitError || error) && (
                    <div className="mb-4">
                        <ErrorMessage
                            message={submitError || error}
                            onRetry={error ? reload : undefined}
                        />
                    </div>
                )}

                {trainings.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg mb-2">Žádné tréninky</p>
                        <p className="text-gray-600 text-sm">Klikni na &quot;Nový trénink&quot; a začni!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {trainings.map((training) => (
                            <TrainingCard key={training.id} training={training} />
                        ))}
                    </div>
                )}
            </div>

            <UserSidebar user={user} trainings={trainings} />

            {isModalOpen && (
                <TrainingFormModal
                    formData={formData}
                    errors={errors}
                    submitError={submitError}
                    seconds={timer.seconds}
                    onChange={handleChange}
                    onCancel={handleCancel}
                    onSave={stopTraining}
                />
            )}
        </div>
    );
}
