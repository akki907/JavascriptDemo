import { useState } from "react";


const useData = () => {
    const [data, setData] = useState({
        count: 0,
    });

    const increment = () => {
        setData((prev) => ({ count: prev.count + 1 }));
    };

    const decrement = () => {
        setData((prev) => ({ count: prev.count - 1 }));
    };

    return { data, increment, decrement };
}

export default useData;