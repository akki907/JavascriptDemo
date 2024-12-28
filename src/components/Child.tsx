import useData from '@/hooks/useData'
import React from 'react'

const Child = () => {

    const { data } = useData()

    return (
        <div>{data.count}</div>
    )
}

export default Child