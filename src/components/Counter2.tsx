import React, { useState } from 'react'

type Counter2Props = {
    initNumber? : number
}
type Counter = {
    count: number
}
const Counter2 : React.FunctionComponent<Counter2Props> = (props ) => {
    const {initNumber} = props
    const [counter,setCount] = useState<number>(initNumber || 0)
    const increase = () => {
        setCount(counter => {
            return counter + 1
        })
    }
   
    function decrease () :void {
        setCount(counter => {
            return counter -1
        })
    }
    return <h2>
        Counter2
        initNumber : {counter}
        <button type="button" onClick={increase}>increase</button>
        <button type="button" onClick={decrease}>decrease</button>
    </h2>
}

export default Counter2