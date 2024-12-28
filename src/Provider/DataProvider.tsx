

import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext<DataInterface | null>(null);

const useData = () => {
    const data = useContext(DataContext);
    return data;
}

interface DataInterface {
    data: {
        count: number;
    }
    increment: () => void;
    decrement: () => void;
}


const DataProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [data, setData] = useState({
        count: 0,
    });

    const increment = () => {
        setData((prev) => ({ count: prev.count + 1 }));
    }

    const decrement = () => {

        setData((prev) => ({ count: prev.count - 1 }));
    }



    return (
        <DataContext.Provider value={{ data, increment, decrement }} >
            {children}
        </DataContext.Provider >
    );
}
export { DataProvider, useData };