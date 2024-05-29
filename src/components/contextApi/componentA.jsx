import React, { useContext } from 'react'
import ComponentB from './componentB'

import { informationContext, userContext } from '../../App'

function ComponentA() {

  const info = useContext(informationContext)
  return (
    <>
    <div>componentA {info.info.class}</div>
    <div>componentA {info.info.gender}</div>
    <div>componentA {info.info.mobile}</div>

    <button onClick={e => info.setinfo(function update(v){return {...v, class:++v.class}})}>click to Update Info</button>
    <ComponentB />
    </>
  )
}
 
export default ComponentA