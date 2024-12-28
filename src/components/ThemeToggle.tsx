import { useTheme } from '@/Provider/ThemeProvider';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-8 flex items-center justify-between p-1 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
            <div
                className={`absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                    }`}
            ></div>
            <SunIcon className="w-5 h-5 text-yellow-400" />
            <MoonIcon className="w-5 h-5 text-blue-500" />
        </button>
    );
};

export default ThemeToggle;
