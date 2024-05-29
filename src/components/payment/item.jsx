import React, {useContext,useState,useEffect} from 'react'
import items from "./items.json"
import "./../pagination/paginate.css"
import Paginate from '../pagination/paginate';
import { paymentContext } from '../../App';
import { Navigate, useNavigate } from "react-router-dom";

async function getProducts(){
  return await fetch("http://127.0.0.1:2000/getProducts", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "start": 0, "from": 10, "search": "" }),
  })
}


function componentD() {
  // let itemsJson = items
  // console.log('itemsJson: ', itemsJson);

  let _paymentReducer = useContext(paymentContext)
  let perPage = 10

  let navigation = useNavigate()

  let [Items, setItems] = useState(null)
  let [noOfRecords, setnoOfRecords] = useState(0)
  let [Start, setStart] = useState(1)
  let [From, setFrom] = useState(10)
  console.log('Items:------------- ', Items);

  useEffect(() => {
    (
      async()=>{
        let response = await fetch("http://127.0.0.1:2000/getProducts", {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "start": Start, "from": From, "search": "" }),
        })

        let data = await response.json()

        console.log('response: ',data);
        if(data.statusCode == 200){
          setItems(data.list)
          setnoOfRecords(data.noOfRecords)
        }
      }
    )()
  }, [Start,From])


  function setStrtFrom(start,from){
    setStart(start)
    setFrom(from)
  }
  
  return (
    <div className='h-100 ' style={{overflow:"none"}}>
      <div className='row text-center'>
        <div className='col-8' >
          <h5 className='col-3 p-2 m-2 bg-primary text-white rounded'>
          ITEM MASTER
          </h5>
        </div>
        <div className='col-4 text-end py-2 px-4'>
          <button size="sm" type="button" className=" btn btn-primary" onClick={() => navigation("/cart")}><i className="bi bi-cart-plus mx-2"></i>Cart</button>
        </div>
      </div>
      {/* <div style={{ height: "75vh", overflow: "scroll", backgroundColor:"#9a8c98" }} className=''> */}

      <div style={{ backgroundColor: "#588157", height: "75vh", overflow: "scroll", }} className='rounded m-2  justify-content-center border border-secondary custom-scrollbar-hidden d-flex flex-wrap'>
        <div class="row justify-content-center">
        { !Items ? "Loading>>>>>" : 
            Items.map((e) => {
            return (
              <div className="col-sm-2 rounded m-1 bg-white">
                <div className='row text-center'>
                  <div className='col-12 p-2' >
                    <button size="sm" type="button" className="btn btn-outline-primary" onClick={() => _paymentReducer.dispatch({ type: "addItem", value: e })}>
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </div>
                </div>
                <div className='row text-center'>
                  <div className=' text-center col-sm-12'>
                    <img src={e.image} className="rounded card-img-top p-3" alt="..." />
                  </div>
                </div>
                <div className='row'>
                  <div className="card-body col-sm-12 text-center" style={{overflowWrap: "anywhere", textOverflow: "inherit", overflowY: "hidden"}}>
                    <p className="card-text"><small>{e.description}</small></p>
                  </div>
                </div>
              </div>
              )
          })
        }
        </div>
    </div>
      {/* </div> */}


      <div className='m-0'>
        <Paginate noOfRecords={noOfRecords} perPage={perPage} setStrtFrom={setStrtFrom}/>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default componentD