import React, { useContext, useState , useEffect} from 'react'
import { loadStripe} from '@stripe/stripe-js'
import { json, useLocation, useNavigate } from 'react-router-dom'
import { paymentContext } from '../../App';

function cart() {

    const [Total, setTotal] = useState(0)
    const location = useLocation();
    const navigation = useNavigate();

    const paymentState = useContext(paymentContext)

    let total = parseFloat((paymentState.state.cart.reduce((acc,obj) => acc + (obj.quantity * obj.discountPercentage), 0)).toFixed(3))

    useEffect(() => {
        setTotal(total)
      return () => {
        console.log("cart component dying::::")
      }
    }, [total])
    
    let incDecQuantity = (e, v)=>{
        v.quantity = e.target.value
        paymentState.dispatch({ type: "incDecQuantity", value: v})
    }

    const paymentIntegration = async () => {
        const strip = await loadStripe('pk_test_51OyXecSHWTtlA1Fa7ndTltaoYtpAmqWLAMSVpmkIT2UQIUqobpE5hGBcdNjx1LvVOpWaDoIU6ojDTgwISshAcejD0094f8RcqL')
        const body = {
            products: paymentState.state.cart
        }

        const headers = {
            "Content-Type":"application-json"
        }

        console.log('body: ', body);
        let response = await fetch("http://127.0.0.1:2000/checkoutsession", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                products: paymentState.state.cart
            }),
        })

        const session = await response.json()
        console.log('session: ', session);

        const result = strip.redirectToCheckout({sessionId:session.id})

        if(result.error){
            // alert(result.error)
            console.warn(result.error)
        }
    }
    
    
    return (
        <div className='m-0 p-0' style={{ width: "100vw", height: "100vh" }}>
        <br></br>
        <div className='container rounded bg-white'>
            <div className='row'>
                <div className="rounded col-8 border">
                    <div className="d-flex justify-content-between align-items-center my-4">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                    </div>
                        <hr className="my-3" />

                    {
                        paymentState.state.cart.map((e) => {

                            // setTotal((e)=>(e++))
                            return (
                                <div key={e._id}>
                                    {/* {JSON.stringify(e)} */}
                                    <div className="row mb-4 d-flex justify-content-between align-items-center">
                                        <div className="col-md-2 col-lg-2 col-xl-2">
                                            <img
                                                src={e.image}
                                                className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-3">
                                            <h6 className="text-muted">{e.category}</h6>
                                            <h6 className="text-black mb-0">{e.title}</h6>
                                        </div>
                                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            <button className="btn btn-link px-2"
                                                onClick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                                <i className="fas fa-minus"></i>
                                            </button>

                                            <input id="form1" min="1" name="quantity" value={e.quantity} onChange={(ev) => incDecQuantity(ev, e)} type="number"
                                                className="form-control form-control-sm" />

                                            <button className="btn btn-link px-2"
                                                onClick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                            <h6 className="mb-0">€ <del>{e.price}</del></h6>
                                            <h6 className="mb-0">€ {e.discountPercentage}</h6>
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                            <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                                        </div>
                                    </div>

                                    <hr className="my-4" />
                                </div>
                            )
                        })
                    }

                        <div className='d-flex justify-content-end m-1' >
                                <button size="sm" type="button" className="btn btn-outline-primary" onClick={() => (navigation(-1))}>Back to Shop</button>
                            </div>
                </div>
                <div className="col-4">
                    <h3 className="fw-bold mb-3 mt-2 pt-2">Summary</h3>
                    <hr className="mt-5" />

                    <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">items {paymentState.state.cart.length}</h5>
                        <h5>€ {Total}</h5>
                    </div>

                    <h5 className="text-uppercase mb-5">Shipping</h5>

                    <div className="mb-4 pb-2">
                        <select className="select">
                            <option value="1">Standard-Delivery- €5.00(By Plan)</option>
                            <option value="2">Bycycle</option>
                            <option value="2">Train</option>
                            <option value="2">Cab</option>
                        </select>
                    </div>

                    <h5 className="text-uppercase mb-2">Give code</h5>

                    <div className="mb-4">
                        <div className="form-outline">
                            <input placeholder='Give the code ' type="text" id="form3Examplea2" className="form-control form-control-md" />
                        </div>
                    </div>

                    <hr className="my-2" />

                    <div className="d-flex justify-content-between mb-3">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>€ 137.00</h5>
                    </div>

                    <button type="button" className="mb-3 btn btn-dark btn-block btn-lg"
                        data-mdb-ripple-color="dark" onClick={()=>paymentIntegration()}>Checkout</button>

                </div>
            </div>
        </div>
    </div>
)}

export default cart


    // < div className = "container bg-white" >
    //     <div className="row justify-content-center">
    //         <div className="col-lg-8">
    //             <div className="">
    //                 <div className="d-flex justify-content-between align-items-center mb-5">
    //                     <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
    //                     <h6 className="mb-0 text-muted">{paymentState.state.cart.length}</h6>
    //                 </div>
    //                 <hr className="my-2" />

    //                 {
    //                     paymentState.state.cart.map((e) => {

    //                         // setTotal((e)=>(e++))
    //                         return (
    //                             <div key={e._id}>
    //                                 {/* {JSON.stringify(e)} */}
    //                                 <div className="row mb-4 d-flex justify-content-between align-items-center">
    //                                     <div className="col-md-2 col-lg-2 col-xl-2">
    //                                         <img
    //                                             src={e.image}
    //                                             className="img-fluid rounded-3" alt="Cotton T-shirt" />
    //                                     </div>
    //                                     <div className="col-md-3 col-lg-3 col-xl-3">
    //                                         <h6 className="text-muted">{e.category}</h6>
    //                                         <h6 className="text-black mb-0">{e.title}</h6>
    //                                     </div>
    //                                     <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
    //                                         <button className="btn btn-link px-2"
    //                                             onClick="this.parentNode.querySelector('input[type=number]').stepDown()">
    //                                             <i className="fas fa-minus"></i>
    //                                         </button>

    //                                         <input id="form1" min="1" name="quantity" value={e.quantity} onChange={(ev) => incDecQuantity(ev, e)} type="number"
    //                                             className="form-control form-control-sm" />

    //                                         <button className="btn btn-link px-2"
    //                                             onClick="this.parentNode.querySelector('input[type=number]').stepUp()">
    //                                             <i className="fas fa-plus"></i>
    //                                         </button>
    //                                     </div>
    //                                     <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
    //                                         <h6 className="mb-0">€ <del>{e.discountPercentage}</del></h6>
    //                                         <h6 className="mb-0">€ {e.price}</h6>
    //                                     </div>
    //                                     <div className="col-md-1 col-lg-1 col-xl-1 text-end">
    //                                         <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
    //                                     </div>
    //                                 </div>

    //                                 <hr className="my-4" />
    //                             </div>
    //                         )
    //                     })
    //                 }

    //                 <div className='d-flex justify-content-end m-1' >
    //                     <button size="sm" type="button" className="btn btn-outline-primary" onClick={() => (navigation(-1))}>Back to Shop</button>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="col-lg-4 bg-grey">
    //             <div className="">
    //                 <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
    //                 <hr className="my-4" />

    //                 <div className="d-flex justify-content-between mb-4">
    //                     <h5 className="text-uppercase">items {paymentState.state.cart.length}</h5>
    //                     <h5>€ {Total}</h5>
    //                 </div>

    //                 <h5 className="text-uppercase mb-3">Shipping</h5>

    //                 <div className="mb-4 pb-2">
    //                     <select className="select">
    //                         <option value="1">Standard-Delivery- €5.00</option>
    //                         <option value="2">Two</option>
    //                         <option value="3">Three</option>
    //                         <option value="4">Four</option>
    //                     </select>
    //                 </div>

    //                 <h5 className="text-uppercase mb-3">Give code</h5>

    //                 <div className="mb-5">
    //                     <div className="form-outline">
    //                         <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
    //                         <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
    //                     </div>
    //                 </div>

    //                 <hr className="my-2" />

    //                 <div className="d-flex justify-content-between mb-5">
    //                     <h5 className="text-uppercase">Total price</h5>
    //                     <h5>€ 137.00</h5>
    //                 </div>

    //                 <button type="button" className="btn btn-dark btn-block btn-lg"
    //                     data-mdb-ripple-color="dark">Register</button>

    //             </div>
    //         </div>
    //     </div>
    // </div >