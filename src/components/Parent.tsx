
import useData from '@/hooks/useData'

const ParentComponemt = () => {

    const { increment, decrement } = useData()

    return (
        <div>
            <>Parent</>
            <div className='flex'>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>

        </div>
    )
}

export default ParentComponemt