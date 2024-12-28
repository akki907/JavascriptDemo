

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const data = [
    { id: 1, title: 'Slide 1', content: 'Welcome to the first slide' },
    { id: 2, title: 'Slide 2', content: 'This is the second slide' },
    { id: 3, title: 'Slide 3', content: 'Here is the third slide' },
    { id: 4, title: 'Slide 4', content: 'And finally, the fourth slide' }
]

const SeacondaryCousel = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [data.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    };



    return (
        <div className='relative w-full max-w-3xl mx-auto'>
            <div className='relative h-64 overflow-hidden rounded-lg'>

                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        style={{
                            transform: `translateX(${(index - currentSlide) * 100}%)`
                        }}
                    >
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-8 text-center">
                            <h2 className="text-2xl mb-4">{item.title}</h2>
                            <p className="text-gray-600">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='absolute top-0 left-0 flex items-center justify-between w-full h-full'>
                <button onClick={prevSlide} className='absolute left-0 p-2 text-white bg-black bg-opacity-25 rounded-full'>
                    <ChevronLeft size={20} />
                </button>
                <button onClick={nextSlide} className='absolute right-0 p-2 text-white bg-black bg-opacity-25 rounded-full'>
                    <ChevronRight size={20} />
                </button>
            </div>


            <div
                className='absolute bottom-0 left-0 flex justify-center w-full p-4'
            >
                {data.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-4 h-4 mx-2 rounded-full ${index === currentSlide ? 'bg-black' : 'bg-gray-300'
                            }`}
                    ></button>
                ))}
            </div>
        </div>)

}

export default SeacondaryCousel