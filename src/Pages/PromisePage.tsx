// import React, { useState, useCallback } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Slider } from '@/components/ui/slider';
// import { Loader2, Info, RotateCcw, Play, Pause } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";

// const PromiseBox = ({ id, duration, status, error, method, onSpeedChange }) => {
//     const [speed, setSpeed] = useState(1);

//     const handleSpeedChange = useCallback((newSpeed) => {
//         setSpeed(newSpeed);
//         onSpeedChange(id, newSpeed);
//     }, [id, onSpeedChange]);

//     const statusVariants = {
//         pending: {
//             scale: [1, 1.02, 1],
//             transition: { repeat: Infinity, duration: 2 / speed }
//         },
//         fulfilled: {
//             scale: [1, 1.2, 1],
//             rotate: [0, 10, -10, 0],
//             transition: { duration: 0.5 }
//         },
//         rejected: {
//             scale: 1,
//             x: [0, -10, 10, -10, 10, 0],
//             transition: { duration: 0.5 }
//         }
//     };

//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="relative"
//         >
//             <motion.div
//                 variants={statusVariants}
//                 animate={status}
//                 className={`p-4 rounded-lg border-2 ${status === 'pending' ? 'bg-yellow-100 border-yellow-400' :
//                         status === 'fulfilled' ? 'bg-green-100 border-green-400' :
//                             status === 'rejected' ? 'bg-red-100 border-red-400' : 'bg-gray-100'
//                     }`}
//             >
//                 <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium">Promise {id}</span>
//                     <motion.div
//                         animate={{
//                             backgroundColor: status === 'fulfilled' ? '#22c55e' :
//                                 status === 'rejected' ? '#ef4444' : '#eab308'
//                         }}
//                         className="px-2 py-1 rounded text-white text-xs"
//                     >
//                         {status}
//                     </motion.div>
//                 </div>

//                 <motion.div
//                     initial={{ width: '0%' }}
//                     animate={{
//                         width: status !== 'pending' ? '100%' : '0%',
//                     }}
//                     transition={{ duration: (duration / 1000) / speed }}
//                     className={`h-2 rounded ${status === 'fulfilled' ? 'bg-green-500' :
//                             status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
//                         }`}
//                 />

//                 <div className="mt-2 space-y-2">
//                     <div className="flex items-center justify-between">
//                         <span className="text-xs text-gray-500">Speed: {speed}x</span>
//                         <Slider
//                             value={[speed]}
//                             min={0.5}
//                             max={2}
//                             step={0.5}
//                             className="w-32"
//                             onValueChange={([value]) => handleSpeedChange(value)}
//                         />
//                     </div>
//                     <div className="text-xs text-gray-500">
//                         Duration: {Math.round(duration / speed)}ms
//                     </div>
//                     {error && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             className="text-xs text-red-500"
//                         >
//                             {error}
//                         </motion.div>
//                     )}
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// const StatsPanel = ({ stats }) => (
//     <Card className="mt-4">
//         <CardContent className="pt-4">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Metric</TableHead>
//                         <TableHead className="text-right">Value</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {Object.entries(stats).map(([key, value]) => (
//                         <TableRow key={key}>
//                             <TableCell>{key}</TableCell>
//                             <TableCell className="text-right">{value}</TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </CardContent>
//     </Card>
// );

// const PromiseMethodsDemo = () => {
//     const [activeDemo, setActiveDemo] = useState(null);
//     const [promiseStates, setPromiseStates] = useState([]);
//     const [result, setResult] = useState('');
//     const [isPaused, setIsPaused] = useState(false);
//     const [stats, setStats] = useState({});
//     const [customConfig, setCustomConfig] = useState({
//         totalPromises: 3,
//         baseDelay: 1000,
//     });

//     const calculateStats = (states) => {
//         const completed = states.filter(s => s.status !== 'pending');
//         const successful = completed.filter(s => s.status === 'fulfilled');
//         const failed = completed.filter(s => s.status === 'rejected');

//         return {
//             'Total Promises': states.length,
//             'Completed': completed.length,
//             'Success Rate': `${Math.round((successful.length / states.length) * 100)}%`,
//             'Average Duration': `${Math.round(states.reduce((acc, s) => acc + s.duration, 0) / states.length)}ms`,
//             'Failed': failed.length
//         };
//     };

//     const handleSpeedChange = useCallback((id, speed) => {
//         setPromiseStates(prev =>
//             prev.map(p => p.id === id ? { ...p, speed } : p)
//         );
//     }, []);

//     const resetDemo = () => {
//         setActiveDemo(null);
//         setPromiseStates([]);
//         setResult('');
//         setStats({});
//     };

//     const togglePause = () => {
//         setIsPaused(!isPaused);
//         // Implementation would need promise pause/resume logic
//     };

//     const createPromise = (id, duration, shouldSucceed) => {
//         return new Promise((resolve, reject) => {
//             setPromiseStates(prev => [
//                 ...prev,
//                 { id, status: 'pending', duration, speed: 1 }
//             ]);

//             const timer = setTimeout(() => {
//                 if (shouldSucceed) {
//                     setPromiseStates(prev => {
//                         const newStates = prev.map(p =>
//                             p.id === id ? { ...p, status: 'fulfilled' } : p
//                         );
//                         setStats(calculateStats(newStates));
//                         return newStates;
//                     });
//                     resolve(`Promise ${id} resolved`);
//                 } else {
//                     setPromiseStates(prev => {
//                         const newStates = prev.map(p =>
//                             p.id === id ? { ...p, status: 'rejected', error: 'Failed' } : p
//                         );
//                         setStats(calculateStats(newStates));
//                         return newStates;
//                     });
//                     reject(`Promise ${id} rejected`);
//                 }
//             }, duration);

//             return () => clearTimeout(timer);
//         });
//     };

//     const getPromiseConfig = (method) => {
//         const baseConfigs = {
//             all: [
//                 { id: 1, succeeds: true },
//                 { id: 2, succeeds: true },
//                 { id: 3, succeeds: true }
//             ],
//             allSettled: [
//                 { id: 1, succeeds: false },
//                 { id: 2, succeeds: true },
//                 { id: 3, succeeds: true }
//             ],
//             race: [
//                 { id: 1, succeeds: true },
//                 { id: 2, succeeds: false },
//                 { id: 3, succeeds: true }
//             ],
//             any: [
//                 { id: 1, succeeds: false },
//                 { id: 2, succeeds: true },
//                 { id: 3, succeeds: true }
//             ]
//         };

//         return baseConfigs[method].map((config, index) => ({
//             ...config,
//             duration: customConfig.baseDelay * (1 + index * 0.5)
//         }));
//     };

//     const runDemo = async (method) => {
//         resetDemo();
//         setActiveDemo(method);

//         const config = getPromiseConfig(method);
//         const promises = config.map(({ id, duration, succeeds }) =>
//             createPromise(id, duration, succeeds)
//         );

//         try {
//             switch (method) {
//                 case 'all':
//                     await Promise.all(promises);
//                     setResult('✅ All promises resolved successfully');
//                     break;
//                 case 'allSettled':
//                     await Promise.allSettled(promises);
//                     setResult('🎉 All promises completed');
//                     break;
//                 case 'race':
//                     await Promise.race(promises);
//                     setResult('🏁 First promise completed');
//                     break;
//                 case 'any':
//                     await Promise.any(promises);
//                     setResult('⭐️ First successful promise completed');
//                     break;
//             }
//         } catch (error) {
//             setResult(`❌ Error: ${error.message || error}`);
//         }
//     };

//     return (
//         <Card className="w-full max-w-4xl">
//             <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                     Advanced Promise Methods Demo
//                     <div className="flex gap-2">
//                         <TooltipProvider>
//                             <Tooltip>
//                                 <TooltipTrigger>
//                                     <Info className="h-5 w-5 text-gray-400" />
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                     <p>Interactive demo of JavaScript Promise methods with real-time statistics and controls.</p>
//                                 </TooltipContent>
//                             </Tooltip>
//                         </TooltipProvider>
//                     </div>
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//                 <div className="flex gap-4 flex-wrap">
//                     {['all', 'allSettled', 'race', 'any'].map((method) => (
//                         <TooltipProvider key={method}>
//                             <Tooltip>
//                                 <TooltipTrigger asChild>
//                                     <Button
//                                         onClick={() => runDemo(method)}
//                                         disabled={activeDemo !== null && !isPaused}
//                                         className="flex-1"
//                                     >
//                                         {activeDemo === method && !isPaused && (
//                                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         )}
//                                         Promise.{method}
//                                     </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent>
//                                     <p>{method} method behavior and characteristics</p>
//                                 </TooltipContent>
//                             </Tooltip>
//                         </TooltipProvider>
//                     ))}
//                 </div>

//                 <div className="flex gap-2">
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={togglePause}
//                         disabled={!activeDemo}
//                     >
//                         {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
//                     </Button>
//                     <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={resetDemo}
//                         disabled={!activeDemo}
//                     >
//                         <RotateCcw className="h-4 w-4" />
//                     </Button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                     {promiseStates.length > 0 && (
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="space-y-4"
//                         >
//                             {promiseStates.map((promise) => (
//                                 <PromiseBox
//                                     key={promise.id}
//                                     {...promise}
//                                     method={activeDemo}
//                                     onSpeedChange={handleSpeedChange}
//                                 />
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>

//                 {Object.keys(stats).length > 0 && <StatsPanel stats={stats} />}

//                 <AnimatePresence>
//                     {result && (
//                         <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             className="p-4 bg-gray-100 rounded-md text-center font-medium"
//                         >
//                             {result}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </CardContent>
//         </Card>
//     );
// };

// export default PromiseMethodsDemo;