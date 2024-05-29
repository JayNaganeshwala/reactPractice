import React from 'react'
import {userContext} from "../../App"

function componentC() {

    let updateUser = (setUsetState, data) => {
        setUsetState((e) =>{
            if(e.name !== data.name){
                console.log("e.name data.name",e.name,data.name)
                return {...e , ...data}
            }
            return e
        })
    }
  return (
    <>
        <div>componentC</div>

        <userContext.Consumer>
            {
                user => {
                    return (
                        <>
                            <div>app response {user.user.name}</div>
                            <div>app response {user.user.age}</div>
                            <button onClick={e => updateUser(user.setUser,{name:"ketan",age:27,address:"ahmdabad"})}>click</button>
                        </>
                    )
                }
            }
        </userContext.Consumer>
    </>
  )
}

export default componentC