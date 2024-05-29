import React,{useState} from 'react'
import "./paginate.css"

function paginate(props) {

    const [active, setactive] = useState(0)
    let arr = []
    
    let pages = Math.ceil(props.noOfRecords / props.perPage)
    for (let i = 0; i < pages; i++) {
        arr.push(i)
    }
    console.log('arr: ', arr);

    function changeActive(e){
        console.log('e: ', e);
        setactive(e)
        props.setStrtFrom(props.perPage*e,props.perPage)
    }

  return (
      <div className='position-relative justify-content-end align-item-end'>
          <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end m-3">
                  <li className="page-item m-1">
                      <div className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                          {/* <span className="sr-only">Previous</span> */}
                      </div>
                  </li>
                  {
                    arr.map((e,i) => {

                        return (
                            <div key={i}>
                                <li className={active == i ? "active  page-item m-1": "page-item m-1"} onClick={()=>changeActive(i)}><div className="page-link" href="#">{e+1}</div></li>
                            </div>
                        )
                    })
                  }
                  <li className="page-item m-1">
                      <div className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                          {/* <span className="sr-only">Next</span> */}
                      </div>
                  </li>
              </ul>
          </nav>
    </div>
  )
}

export default paginate