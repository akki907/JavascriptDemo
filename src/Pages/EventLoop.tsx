import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define TypeScript interfaces
interface Task {
    id: number;
    name: string;
    priority: 'high' | 'medium' | 'low';
    timestamp: number;
    type: 'promise' | 'setTimeout' | 'setInterval' | 'fetch' | 'eventListener';
}

interface LogEntry {
    id: number;
    message: string;
    timestamp: number;
}

interface Stats {
    tasksProcessed: number;
    averageProcessingTime: number;
    microTasksProcessed: number;
    macroTasksProcessed: number;
}

const EventLoopDemo: React.FC = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [stack, setStack] = useState<Task[]>([]);
    const [microQueue, setMicroQueue] = useState<Task[]>([]);
    const [macroQueue, setMacroQueue] = useState<Task[]>([]);
    const [log, setLog] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState<Stats>({
        tasksProcessed: 0,
        averageProcessingTime: 0,
        microTasksProcessed: 0,
        macroTasksProcessed: 0,
    });

    const addToLog = (message: string) => {
        setLog(prev => [...prev, { id: Date.now(), message, timestamp: Date.now() }]);
    };

    const updateStats = (taskType: 'micro' | 'macro') => {
        setStats(prev => ({
            ...prev,
            tasksProcessed: prev.tasksProcessed + 1,
            [taskType === 'micro' ? 'microTasksProcessed' : 'macroTasksProcessed']:
                prev[taskType === 'micro' ? 'microTasksProcessed' : 'macroTasksProcessed'] + 1,
            averageProcessingTime: (prev.averageProcessingTime * prev.tasksProcessed + 1500) / (prev.tasksProcessed + 1),
        }));
    };

    const clearAll = () => {
        setStack([]);
        setMicroQueue([]);
        setMacroQueue([]);
        setLog([]);
        setIsRunning(false);
        setStats({
            tasksProcessed: 0,
            averageProcessingTime: 0,
            microTasksProcessed: 0,
            macroTasksProcessed: 0,
        });
    };

    const addCustomTask = (type: Task['type'], priority: Task['priority'] = 'medium') => {
        const newTask: Task = {
            id: Date.now(),
            name: `${type} (${priority})`,
            priority,
            timestamp: Date.now(),
            type,
        };

        if (type === 'promise') {
            setMicroQueue(prev => [...prev].sort((a, b) =>
                getPriorityValue(b.priority) - getPriorityValue(a.priority)
            ));
            addToLog(`Added ${type} to micro queue with ${priority} priority`);
        } else {
            setMacroQueue(prev => [...prev, newTask].sort((a, b) =>
                getPriorityValue(b.priority) - getPriorityValue(a.priority)
            ));
            addToLog(`Added ${type} to macro queue with ${priority} priority`);
        }
    };

    const getPriorityValue = (priority: Task['priority']): number => {
        switch (priority) {
            case 'high': return 3;
            case 'medium': return 2;
            case 'low': return 1;
        }
    };

    const simulateEventLoop = () => {
        // Add initial main function to stack
        setStack([{
            id: 1,
            name: 'main()',
            priority: 'high',
            timestamp: Date.now(),
            type: 'eventListener'
        }]);

        // Simulate various async operations
        setTimeout(() => addCustomTask('setTimeout', 'medium'), 2000);
        Promise.resolve().then(() => addCustomTask('promise', 'high'));
        setTimeout(() => addCustomTask('setInterval', 'low'), 3000);

        // Simulate fetch operation
        setTimeout(() => {
            addCustomTask('fetch', 'high');
            addToLog('Simulated fetch operation started');
        }, 4000);

        // Simulate DOM event
        setTimeout(() => {
            addCustomTask('eventListener', 'medium');
            addToLog('Simulated DOM event triggered');
        }, 5000);
    };

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setStack(prevStack => {
                    if (prevStack.length > 0) {
                        const task = prevStack[0];
                        addToLog(`Executing: ${task.name}`);
                        updateStats(task.type === 'promise' ? 'micro' : 'macro');
                        return prevStack.slice(1);
                    }

                    if (microQueue.length > 0) {
                        setMicroQueue(prev => prev.slice(1));
                        updateStats('micro');
                        return [microQueue[0]];
                    }

                    if (macroQueue.length > 0) {
                        setMacroQueue(prev => prev.slice(1));
                        updateStats('macro');
                        return [macroQueue[0]];
                    }

                    return prevStack;
                });
            }, 1500);

            return () => clearInterval(interval);
        }
    }, [isRunning, microQueue, macroQueue]);

    const renderQueue = (items: Task[], title: string, bgColor: string) => (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className={`${bgColor} p-4 rounded min-h-32 transition-all duration-300`}>
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`bg-white p-2 mb-2 rounded shadow-sm transform transition-all duration-300 border-l-4 ${item.priority === 'high' ? 'border-red-500' :
                                item.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
                                }`}
                            style={{
                                transform: `translateY(${index * 5}px)`
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <span>{item.name}</span>
                                <span className="text-xs text-gray-500">
                                    {Math.floor((Date.now() - item.timestamp) / 1000)}s ago
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">JavaScript Event Loop Visualization</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => {
                            if (!isRunning) simulateEventLoop();
                            setIsRunning(!isRunning);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {isRunning ? <Pause className="inline" /> : <Play className="inline" />}
                    </button>
                    <button
                        onClick={clearAll}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        <RotateCcw className="inline" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                {renderQueue(stack, 'Call Stack', 'bg-red-100')}
                {renderQueue(microQueue, 'Microtask Queue', 'bg-green-100')}
                {renderQueue(macroQueue, 'Macrotask Queue', 'bg-blue-100')}

                <Card>
                    <CardHeader>
                        <CardTitle>Event Loop</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="text-sm">
                                <Activity className="inline mr-2" />
                                Active Tasks: {stack.length + microQueue.length + macroQueue.length}
                            </div>
                            <div className="text-sm">
                                <Clock className="inline mr-2" />
                                Avg Processing: {stats.averageProcessingTime.toFixed(2)}ms
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className=" p-2 rounded">
                                    Micro: {stats.microTasksProcessed}
                                </div>
                                <div className=" p-2 rounded">
                                    Macro: {stats.macroTasksProcessed}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Custom Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                            {(['promise', 'setTimeout', 'fetch'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => addCustomTask(type)}
                                    className="px-3 py-2  rounded  text-sm"
                                >
                                    <Plus className="inline mr-1 w-4 h-4" />
                                    {type}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div>Total Tasks Processed: {stats.tasksProcessed}</div>
                            <div>Micro/Macro Ratio: {stats.microTasksProcessed > 0 ?
                                (stats.macroTasksProcessed / stats.microTasksProcessed).toFixed(2) : '0'}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Execution Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 overflow-y-auto">
                        {log.map(entry => (
                            <div key={entry.id} className="py-1 border-b flex justify-between">
                                <span>{entry.message}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(entry.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-6 p-4  rounded">
                <h3 className="font-bold mb-2">Legend</h3>
                <ul className="space-y-2">
                    <li>🔴 Call Stack: Where function calls are pushed and executed</li>
                    <li>🟢 Microtask Queue (High Priority): Promises, queueMicrotask</li>
                    <li>🔵 Macrotask Queue: setTimeout, setInterval, I/O, DOM events</li>
                    <li>
                        Priority Levels:
                        <span className="ml-2 inline-block w-3 h-3 bg-red-500"></span> High
                        <span className="ml-2 inline-block w-3 h-3 bg-yellow-500"></span> Medium
                        <span className="ml-2 inline-block w-3 h-3 bg-green-500"></span> Low
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EventLoopDemo;