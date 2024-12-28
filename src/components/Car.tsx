
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const CarouselData = [
    { id: 1, title: 'Slide 1', content: 'Welcome to the first slide' },
    { id: 2, title: 'Slide 2', content: 'This is the second slide' },
    { id: 3, title: 'Slide 3', content: 'Here is the third slide' },
    { id: 4, title: 'Slide 4', content: 'And finally, the fourth slide' }
]

const Carousel = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === CarouselData.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(timer);
    }, [CarouselData.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === CarouselData.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? CarouselData.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };



    return (

        <div className="relative w-full max-w-3xl mx-auto">
            {/* Carousel container */}
            <div className="relative h-64 overflow-hidden rounded-lg">
                {/* Slides */}
                {CarouselData.map((item, index) => (
                    <div
                        key={item.id}
                        className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        style={{
                            transform: `translateX(${(index - currentSlide) * 100}%)`
                        }}
                    >
                        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-8 text-center">
                            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                            <p className="text-gray-600">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {CarouselData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel