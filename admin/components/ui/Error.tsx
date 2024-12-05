import React from 'react';
import { useDispatch} from 'react-redux';
import { clearError } from '../../features/slices/errorSlices';

interface ErrorProps {
    state: 'success' | 'danger';
    message: string;
}

const Error: React.FC<ErrorProps> = ({ state, message }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(clearError());
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch]);

    return (
        <div className="flex w-full flex-col gap-2">
            {state === 'success' && (
                <div
                    className="fixed top-4 right-4 mt-2 bg-teal-100 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500 transition-opacity duration-500 ease-in-out"
                    role="alert"
                >
                    <span className="font-bold">Success</span> {message}
                </div>
            )}
            {state === 'danger' && (
                <div
                    className="fixed top-4 right-4 mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 transition-opacity duration-500 ease-in-out"
                    role="alert"
                >
                    <span className="font-bold">Danger</span> {message}
                </div>
            )}
        </div>
    );
};

export default Error;
