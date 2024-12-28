import React from 'react';
import { motion } from 'framer-motion';
import { PromiseMethod, PromiseState } from '@/types/type';

interface PromiseBoxProps extends PromiseState {
    method: PromiseMethod | null;
    onSpeedChange: (id: number, speed: number) => void;
}

const statusVariants = {
    pending: {
        scale: [1, 1.02, 1],
        transition: { repeat: Infinity, duration: 2 }
    },
    fulfilled: {
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5 }
    },
    rejected: {
        scale: 1,
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
    }
};

export const PromiseBox: React.FC<PromiseBoxProps> = ({
    id,
    duration,
    status,
    error,
    speed,
}) => {

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
        >
            <motion.div
                variants={statusVariants}
                animate={status}
                className={`p-4 rounded-lg border-2 ${status === 'pending' ? 'bg-yellow-100 border-yellow-400' :
                    status === 'fulfilled' ? 'bg-green-100 border-green-400' :
                        'bg-red-100 border-red-400'
                    }`}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Promise {id}</span>
                    <motion.div
                        animate={{
                            backgroundColor:
                                status === 'fulfilled' ? '#22c55e' :
                                    status === 'rejected' ? '#ef4444' : '#eab308'
                        }}
                        className="px-2 py-1 rounded text-white text-xs"
                    >
                        {status}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: status !== 'pending' ? '100%' : '0%' }}
                    transition={{ duration: (duration / 1000) / speed }}
                    className={`h-2 rounded ${status === 'fulfilled' ? 'bg-green-500' :
                        status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                />

                <div className="mt-2 space-y-2">
                    <div className="text-xs text-gray-500">
                        Duration: {Math.round(duration / speed)}ms
                    </div>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-red-500"
                        >
                            {error}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};