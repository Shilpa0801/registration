import React, { useState } from "react";
import './Login.css'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt"

function UserLogin() {
  const navigate = useNavigate()
  const [loginRecord, setRecord] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const changeRecord = (e) => {
    setRecord({ ...loginRecord, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    if (!loginRecord.email || !loginRecord.password) {
      setError('Both fields are required.')
      return false
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(loginRecord.email)) {
      setError('Please enter a valid email address.')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const url = 'http://localhost:8000/login'
    Axios.post(url, loginRecord)
      .then((res) => {
        console.log(res.data)
        const response = res.data
        alert(response.msg)

        const decoded = decodeToken(response.token)
        
        if ( response.status === 200) {
          sessionStorage.setItem('token', response.token)
          navigate('/home')
        }
      })
      .catch(err => {
        console.error(err)
        setError('An error occurred. Please try again later.')
      })
  }

  return (
    <>
    <h1 className="heading">LOGIN</h1>
      <div className="loginMain">
        <form className="myname" onSubmit={handleSubmit}>
          
          {error && <p className="error-text">{error}</p>}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={changeRecord}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              id="exampleInputPassword1"
              onChange={changeRecord}
            />
          </div>
          <div>
          <button type="submit" className="btn btn-primary">Submit</button><br />
          </div>
          <p className="reg">Do not have an account? <a id="reg" href="/register">Register</a></p>
        </form>
      </div>
    </>
  )
}

export default UserLogin;


