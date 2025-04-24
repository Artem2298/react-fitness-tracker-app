import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '../context/UserContext';

export default function TrainingPage() {
    const user = useUser();
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [timerId, setTimerId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        type: 'RUN',
        distance: '',
        duration: 0,
        description: '',
        is_public: false
    });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (!user) return;

        async function loadData() {
            try {
                const trainingsRes = await fetch(`http://localhost:3000/training/user/${user.id}`);
                if (!trainingsRes.ok) throw new Error('Failed to fetch trainings');
                const trainingsData = await trainingsRes.json();
                setTrainings(trainingsData);
            } catch (err) {
                console.error('Error loading trainings:', err);
                setSubmitError('Failed to load trainings');
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [user]);

    const startTraining = () => {
        setSeconds(0);
        setIsModalOpen(true);
        const interval = setInterval(() => {
            setSeconds((s) => s + 1);
            setFormData(prev => ({
                ...prev,
                duration: seconds + 1
            }));
        }, 1000);
        setTimerId(interval);
    };

    const stopTraining = async () => {
        clearInterval(timerId);
        
        // Validate form before submission
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        try {
            const response = await fetch('http://localhost:3000/training', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    user_id: user.id,
                    duration: formData.duration / 60 // convert to minutes
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save training');
            }
            
            const newTraining = await response.json();
            setTrainings([...trainings, newTraining]);
            setIsModalOpen(false);
            resetForm();
        } catch (err) {
            console.error('Error saving training:', err);
            setSubmitError(err.message || 'Failed to save training');
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.type) errors.type = 'Type is required';
        if (!formData.distance || isNaN(formData.distance)) errors.distance = 'Distance must be a number';
        if (formData.duration <= 0) errors.duration = 'Duration must be greater than 0';
        return errors;
    };

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'RUN',
            distance: '',
            duration: 0,
            description: '',
            is_public: false
        });
        setErrors({});
        setSubmitError('');
        setSeconds(0);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!user) return <p className="text-white">Loading user...</p>;
    if (loading) return <p className="text-white">Loading trainings...</p>;

    return (
        <div className="flex flex-row p-8 space-x-8">
            {/* Training block */}
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-orange-500 mb-6">My Training</h1>

                <button
                    onClick={startTraining}
                    className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Start Training
                </button>

                {submitError && (
                    <p className="text-red-500 mb-4">{submitError}</p>
                )}

                {trainings.length === 0 ? (
                    <p className="text-white">No trainings found.</p>
                ) : (
                    trainings.map((training) => (
                        <Card key={training.id} className="bg-gray-900 text-white border-gray-700 mb-4">
                            <CardContent className="p-4">
                                <p className="text-lg font-semibold">{training.title}</p>
                                <p className="text-sm text-gray-400">Duration: {training.duration} min</p>
                                <p className="text-sm text-gray-400">Type: {training.type}</p>
                                <p className="text-sm text-gray-400">Distance: {training.distance} km</p>
                                {training.description && (
                                    <p className="text-sm text-gray-400">Description: {training.description}</p>
                                )}
                                <p className="text-sm text-gray-400">
                                    Public: {training.is_public ? 'Yes' : 'No'}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* User profile */}
            <div className="w-80">
                <Card className="bg-gray-800 text-white border-gray-700 sticky top-8">
                    <CardContent className="p-4 space-y-3">
                        {user.avatar_url && (
                            <img src={user.avatar_url} alt="Avatar" className="rounded-full w-24 h-24 mx-auto" />
                        )}
                        <h2 className="text-xl font-bold text-center">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-sm text-gray-400 text-center">{user.email}</p>
                        <p className="text-sm text-gray-400">
                            <strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}
                        </p>
                        {user.bio && (
                            <p className="text-sm text-gray-400">
                                <strong>About me:</strong> {user.bio}
                            </p>
                        )}
                        <p className="text-sm text-gray-400">
                            <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Training form modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white rounded-lg p-6 text-center w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-black">New Training</h2>
                        
                        {submitError && (
                            <p className="text-red-500 mb-4">{submitError}</p>
                        )}
                        
                        <div className="space-y-4 text-left">
                            <div>
                                <label className="block text-gray-700 mb-1">Title*</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 mb-1">Type*</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="RUN">Run</option>
                                    <option value="WALK">Walk</option>
                                    <option value="BIKE">Bike</option>
                                    <option value="SWIM">Swim</option>
                                    <option value="SKI">Ski</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 mb-1">Distance (km)*</label>
                                <input
                                    type="number"
                                    name="distance"
                                    value={formData.distance}
                                    onChange={handleChange}
                                    step="0.1"
                                    className="w-full p-2 border rounded"
                                />
                                {errors.distance && <p className="text-red-500 text-sm">{errors.distance}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 mb-1">Duration (seconds)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={seconds}
                                    readOnly
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                                <p className="text-sm text-gray-500">
                                    {Math.floor(seconds / 60)} minutes {seconds % 60} seconds
                                </p>
                                {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                            
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_public"
                                    checked={formData.is_public}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label className="text-gray-700">Public training</label>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={() => {
                                    clearInterval(timerId);
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={stopTraining}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Save Training
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}