import React,{useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./home.css"
import Loader from "../../components/loader/loader";


const ExpenditureBreakdown = () => {
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState({})
  const gradients = [
     "card-purple-blue",
       "card-salmon-pink",
      "card-blue-green",
      "card-purple-pink"
  ]

  useEffect(() => {
   setTimeout(()=>{
    setLoading(false)
    setData({
      "totalSpent" : "3,000",
      "today": "200",
      "thisWeek": "500",
      "thisMonth": "1,000"
    })
   },3000)
  })
  

  return ((<div className="container-fluid">
  {
    loading ? <Loader/> : <div className="row mb-5">
      {
        
        Object.entries(data).map(([key, val], i) => ((
          <div className="col-12 col-sm-6 col-md-3">
              <div className={`card ${gradients[i]} text-white mb-3 mb-md-0`}>
            <div className="card-body d-flex justify-content-between align-items-end">
              <div className="card-number">
                <div className="h3 m-0">₹ {val}</div><small><strong>{key.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + key.replace(/([A-Z])/g, " $1").slice(1)}</strong></small>
              </div>
              <div className="card-description text-right"><small> </small><br/><small> </small></div>
            </div>
          </div></div>
             )))
           }
  </div>
  }
  </div>))
};

export default ExpenditureBreakdown;