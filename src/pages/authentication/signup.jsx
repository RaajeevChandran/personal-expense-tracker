import { sign } from "fontawesome";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state";

export const Register = (props) => {
  const [inputs, setInputs] = useState({});
  const [signingUp,setSigningUp] = useState(false)
  const navigate = useNavigate()
  const signUp = useStore(state => state.signUp)

    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`User Created!Email: ${inputs.email},password : ${inputs.password}`);
      setSigningUp(true)
      await signUp();
      setSigningUp(false)
      navigate("/")
    }


    return (
      <div className="base-container" ref={props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input type="text" name="username" value={inputs.username}
              onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email"  value={inputs.email}
              onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password"  value={inputs.password}
              onChange={handleInputChange}/>
            </div>
            <div className="
            form-group">
              <label htmlFor="monthly-limit">Monthly Limit (₹)</label>
              <input type="number" name="monthlyLimit"  value={inputs.monthlyLimit}
              onChange={handleInputChange}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={handleSubmit}>
            {
              signingUp ? "Registering" : "Register"
            }
          </button>
        </div>
      </div>
    );
  }
