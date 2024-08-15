import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Profile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch profile');
                navigate('/signin');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleSignout = async () => {
        try {
            await api.get('/signout');
            navigate('/signin');
        } catch (error) {
            console.error(error);
            setError('Failed to sign out');
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-2xl mb-6 text-center font-bold">Profile</h2>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <p className="mb-4 text-center">Welcome, {user.username}!</p>
                    <div className="flex items-center justify-center">
                        <button
                            onClick={handleSignout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;