import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../state";
// import {useHistory} from "react-router-dom"

export const Login = (props)  => {
    const [inputs, setInputs] = useState({});
    const logIn = useStore(state => state.logIn)
    const navigate = useNavigate()
    const [loggingIn,setLoggingIn] = useState(false)

    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`User Created!Email: ${inputs.email},password : ${inputs.password}`);
      setLoggingIn(true);
      await logIn();
      setLoggingIn(false)
      navigate("/")
    }

    return (
      <div className="base-container" ref={props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input type="text" name="email" value={inputs.email}
              onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={inputs.password}
              onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={handleSubmit}>
            {
              loggingIn ? 
              "Logging In"
              : "Login"
            }
          </button>
        </div>
      </div>
    );
  


}


