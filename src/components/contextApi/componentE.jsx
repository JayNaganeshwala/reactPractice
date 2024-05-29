import React, {useContext,useState} from 'react'
import { ReducerHookWithContext } from '../../App'
function componentD() {
  const [name, setName] = useState("jay")
  console.log(name)
  let reducer = useContext(ReducerHookWithContext)
  console.log('reducer: ', reducer);
  return (
    <>
      <div>componentE</div>
      <div>Count - {reducer.state.counter}</div>
      <button onClick={() => reducer.dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => reducer.dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => reducer.dispatch({ type: "reset" })}>Resset</button>
      <button onClick={() => reducer.dispatch({ type: "incrementBy", value: 5 })}>Increment By 5</button>
      <button onClick={() => reducer.dispatch({ type: "decrementBy", value: 5 })}>Decrement By 5</button>
      <div>{name}</div>
      <button onClick={() => setName((e)=>(e = "ami"))}>Name Update</button>
    </>

    
  )
}

export default componentD