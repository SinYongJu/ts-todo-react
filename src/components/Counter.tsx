import React from 'react';

interface CounterProps {
    initCount: number
}

interface CounterState {
    maxCount: number,
    count: number,
}

let interval : any;

class Counter extends React.Component< CounterProps,CounterState> {
    constructor(props : CounterProps){
        super(props)
        this.state = {
            count : 0,
            maxCount : 60
        }
    }
    componentDidMount () {
        console.log('componentDidMount')
        interval = setInterval(this.increase,1000)
    }
    
    increase =()=>{
        console.log('increase')
      this.setState((state)=>{
        const curr = state.count+1
        // if(curr > state.maxCount){
            // clearInterval(interval)
            // return state
        // }
        return {
            ...state,
            count : curr
        }
      })
    }
    componentDidUpdate(){
        const curr = this.state.count
        // console.log('componentDidUpdate',curr)
        if(curr + 1 > this.state.maxCount){
            clearInterval(interval)
            // console.log('end')
        }
    }
    componentWillUpdate(){
        // const curr = this.state.count
        // console.log('componentWillUpdate',curr)
    }

    render(){
        const {initCount} = this.props
        const {maxCount,count} = this.state
        return <h2>
            Counter  <br/>
            <p>initCount : {initCount}</p>
            <p>maxCount : {maxCount}</p>
            <p>count: {count}</p>
         </h2>
    }
}

export default Counter