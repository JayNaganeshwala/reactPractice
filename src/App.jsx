import { useState, useReducer, useContext } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import ComponentA from './components/contextApi/componentA'
import Item from './components/payment/item'
import Success from './components/payment/success'
import Cancel from './components/payment/cancel'
import Cart from './components/payment/cart'
import ComponentD from './components/contextApi/componentD'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
export const userContext = React.createContext()
export const informationContext = React.createContext()
export const ReducerHookWithContext = React.createContext()

function ContextApiCode(){
  const [user, setUser] = useState({
    name: "jay",
    age: 21,
    address: "I 15",
  })

  const [info, setinfo] = useState({
    class: 12,
    mobile: 12345,
    gender: "male"
  })

  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <informationContext.Provider value={{ info, setinfo }}>
          <ComponentA />
        </informationContext.Provider>
      </userContext.Provider>
    </>
  )
}


const initialState = {
  counter: 0,
  name:"Jay",
  sirname:"Naganeshwala",
  address:"I 15 madhuram",
  gender:"male",
  mobile:1234567890,
  age:21,
}

const reducer = (state, action) => {
  switch(action.type){
    case "increment":
      return { counter:state.counter+1}
    case "decrement":
      return { counter:state.counter-1}
    case "reset":
      return { counter:0}
    case "incrementBy":
      return { counter:state.counter + action.value}
    case "decrementBy":
      return { counter:state.counter - action.value}
  }
}
function ReducerHookCode(){
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div>Count - {state.counter}</div>
      <button onClick={() => dispatch({type: "increment"})}>Increment</button>
      <button onClick={() => dispatch({type: "decrement"})}>Decrement</button>
      <button onClick={() => dispatch({type: "reset"})}>Resset</button>
      <button onClick={() => dispatch({type: "incrementBy",value:5})}>Increment By 5</button>
      <button onClick={() => dispatch({ type: "decrementBy", value: 5 })}>Decrement By 5</button>
    </>
  )

}

function ReducerHookWithContextCode(){
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <ReducerHookWithContext.Provider value={{state, dispatch}}>
        <ComponentD />
      </ReducerHookWithContext.Provider>
    </>
  )

}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Item/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/success",
    element: <Success/>,
  },
  {
    path: "/cancel",
    element: <Cancel/>,
  },
]);

export const paymentContext = React.createContext()
const initialPaymentState = {
  cart: [],
}

const paymentReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { counter: state.counter + 1 }
    case "addItem": {
      action.value.quantity = 1;
      return { cart: [...state.cart,action.value] }
    }
    case "incDecQuantity": {
      let finder = state.cart.findIndex((e)=>(e._id == action.value._id))
      if(finder!==-1){
        state.cart[finder].quantity = action.value.quantity
        return {cart:state.cart}
      }
    }
    case "decrement":
      return { counter: state.counter - 1 }
    case "reset":
      return { counter: 0 }
    case "incrementBy":
      return { counter: state.counter + action.value }
    case "decrementBy":
      return { counter: state.counter - action.value }
  }
}
function App() {
  // return <ContextApiCode />
  // return <ReducerHookCode />
  // return <ReducerHookWithContextCode />
  const [state, dispatch] = useReducer(paymentReducer, initialPaymentState)

  return(
    <>
    {/* <Item /> */}
    <paymentContext.Provider value={{state,dispatch}}>
      <RouterProvider router={router} />
    </paymentContext.Provider>
    </>
  ) 
}


export default App

  // < div >
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div >
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
