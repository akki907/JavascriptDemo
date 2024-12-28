import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, RotateCcw, Play, Pause } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PromiseBox } from '../components/PromiseBox';
import { StatsPanel } from '../components/StatsPanel';
import {
    PromiseState,
    PromiseConfig,
    CustomConfig,
    Stats,
    PromiseMethod
} from '@/types/type';
import { motion, AnimatePresence } from 'framer-motion';


const methodDescriptions: Record<PromiseMethod, string> = {
    all: "Waits for all promises to resolve. Fails if any promise rejects.",
    allSettled: "Waits for all promises to complete, regardless of success or failure.",
    race: "Returns the first promise to complete, whether it succeeds or fails.",
    any: "Returns the first promise to succeed. Fails only if all promises fail."
};

const PromiseDemo = () => {
    const [activeDemo, setActiveDemo] = useState<PromiseMethod | null>(null);
    const [promiseStates, setPromiseStates] = useState<PromiseState[]>([]);
    const [result, setResult] = useState<string>('');
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stats, setStats] = useState<Stats>({
        'Total Promises': 0,
        'Completed': 0,
        'Success Rate': '0%',
        'Average Duration': '0ms',
        'Failed': 0
    });
    const [customConfig] = useState<CustomConfig>({
        totalPromises: 3,
        baseDelay: 1000,
    });

    const calculateStats = (states: PromiseState[]): Stats => {
        const completed = states.filter(s => s.status !== 'pending');
        const successful = completed.filter(s => s.status === 'fulfilled');
        const failed = completed.filter(s => s.status === 'rejected');

        return {
            'Total Promises': states.length,
            'Completed': completed.length,
            'Success Rate': `${Math.round((successful.length / states.length) * 100)}%`,
            'Average Duration': `${Math.round(states.reduce((acc, s) => acc + s.duration, 0) / states.length)}ms`,
            'Failed': failed.length
        };
    };

    const handleSpeedChange = useCallback((id: number, speed: number) => {
        setPromiseStates(prev =>
            prev.map(p => p.id === id ? { ...p, speed } : p)
        );
    }, []);
    const resetDemo = () => {
        setActiveDemo(null);
        setPromiseStates([]);
        setResult('');
        setStats({
            'Total Promises': 0,
            'Completed': 0,
            'Success Rate': '0%',
            'Average Duration': '0ms',
            'Failed': 0
        });
    };
    const togglePause = () => {
        if (!isLoading && activeDemo) {
            runDemo(activeDemo as PromiseMethod);
        }
        setIsPaused(!isPaused);

        // Implementation would need promise pause/resume logic
    };

    const createPromise = (id: number, duration: number, shouldSucceed: boolean): Promise<string> => {
        return new Promise((resolve, reject) => {
            setPromiseStates(prev => [
                ...prev,
                { id, status: 'pending', duration, speed: 1 }
            ]);

            const timer = setTimeout(() => {
                if (shouldSucceed) {
                    setPromiseStates(prev => {
                        const newStates: PromiseState[] = prev.map(p =>
                            p.id === id ? { ...p, status: 'fulfilled' } : p
                        );
                        setStats(calculateStats(newStates));
                        return newStates;
                    });
                    resolve(`Promise ${id} resolved`);
                } else {
                    setPromiseStates(prev => {
                        const newStates: PromiseState[] = prev.map(p =>
                            p.id === id ? { ...p, status: 'rejected', error: 'Failed' } : p
                        );
                        setStats(calculateStats(newStates));
                        return newStates;
                    });
                    reject(`Promise ${id} rejected`);
                }
            }, duration);

            return () => clearTimeout(timer);
        });
    };

    const getPromiseConfig = (method: PromiseMethod): PromiseConfig[] => {
        const baseConfigs: Record<PromiseMethod, Array<Omit<PromiseConfig, 'duration'>>> = {
            all: [
                { id: 1, succeeds: true },
                { id: 2, succeeds: true },
                { id: 3, succeeds: true }
            ],
            allSettled: [
                { id: 1, succeeds: false },
                { id: 2, succeeds: true },
                { id: 3, succeeds: true }
            ],
            race: [
                { id: 1, succeeds: true },
                { id: 2, succeeds: false },
                { id: 3, succeeds: true }
            ],
            any: [
                { id: 1, succeeds: false },
                { id: 2, succeeds: true },
                { id: 3, succeeds: true }
            ]
        };

        return baseConfigs[method].map((config, index) => ({
            ...config,
            duration: customConfig.baseDelay * (1 + index * 0.5)
        }));
    };

    const runDemo = async (method: PromiseMethod) => {
        setIsLoading(true);
        resetDemo();
        setActiveDemo(method);

        const config = getPromiseConfig(method);
        const promises = config.map(({ id, duration, succeeds }) =>
            createPromise(id, duration, succeeds)
        );

        try {
            switch (method) {
                case 'all':
                    await Promise.all(promises);
                    setResult('✅ All promises resolved successfully');
                    break;
                case 'allSettled':
                    await Promise.allSettled(promises);
                    setResult('🎉 All promises completed');
                    break;
                case 'race':
                    await Promise.race(promises);
                    setResult('🏁 First promise completed');
                    break;
                case 'any':
                    await Promise.any(promises);
                    setResult('⭐️ First successful promise completed');
                    break;
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);

            setResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
        }
    };

    return (<Card className="w-full max--w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">

                    Advanced Promise Methods Demo
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={togglePause}
                        disabled={!activeDemo}
                        variant="default"
                        className="bg-gray-100 text-gray-800"
                    >
                        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                    </Button>
                    <Button
                        onClick={resetDemo}
                        disabled={isLoading}
                        variant="default"
                        className="bg-gray-100 text-gray-800"
                    >
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className='grid   gap-6 sm:grid-cols-5'>
                <div className="col-span-1">
                    <div className="flex gap-4  flex-col   justify-between">
                        {['all', 'allSettled', 'race', 'any'].map((method) => (
                            <TooltipProvider key={method}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            onClick={() => runDemo(method as PromiseMethod)}
                                            disabled={isLoading}
                                            variant={activeDemo === method ? 'default' : 'outline'}
                                            className={`flex-1 ${activeDemo === method ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {isLoading && activeDemo === method && (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Promise.{method}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{method} method behavior and characteristics</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </div>

                </div>
                <div className='col-span-4'>

                    <AnimatePresence mode="wait">
                        {promiseStates.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {promiseStates.map((promise) => (
                                    <PromiseBox
                                        key={promise.id}
                                        {...promise}
                                        method={activeDemo}
                                        onSpeedChange={handleSpeedChange}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>


            {activeDemo && (
                <div className="mt-4 flex items-center">
                    <p className="text-sm  font-bold">{methodDescriptions[activeDemo]}</p>
                </div>
            )}

            {Object.keys(stats).length > 0 && <StatsPanel stats={stats} />}
            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4  rounded-md text-center font-medium"
                    >
                        {result}
                    </motion.div>
                )}
            </AnimatePresence>
        </CardContent>
    </Card>)
};

export default PromiseDemo;