import useData from '@/hooks/useData'

const Child = () => {

    const { data } = useData()

    return (
        <div>{data.count}</div>
    )
}

export default Child