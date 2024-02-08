import '../assets/css/signin/SignIn.css'
import { Link ,useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { useState } from 'react'

Axios.defaults.withCredentials = true

const SignIn = () => {
    const redirect = useNavigate()
    const [error,setError] = useState("")
    const [showPass,setShowPass] = useState(false)

    const [formData,setFormData] = useState({
        username: '',
        password: ''
    })
    
    const FormInput = (e) => {
        const {value,name} = e.target
        setFormData(prev => ({...prev , [name]: value}))
    }

    const SubmitForm = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:5000/login',formData)
        .then(res => {
            
            console.log(res)
            window.location.replace("/home")
        })
        .catch(e => {
            console.log(e.response.data.error)
            setError(e.response.data.error)
        })
        console.log(formData)
    }   

    const ShowPass = (isShow) => {
        if(isShow) {
            setShowPass(true)
        } else {
            setShowPass(false)
        }
    }

  return (
    <section className='signin_container'>
        
        <div className="signin_wrapper">
            <h1>Signin to Ecommerce</h1>
        <form action="" onSubmit={SubmitForm} className='signin_form'>
            {error && 
                <div className='error'>
                    <span>{error}</span> 
                    <i className="fa-solid fa-xmark" onClick={() => setError("")}></i>
                </div>
            }
            <div className='inputs'>
            <label htmlFor="username">Username</label>
            <input 
            value={formData.username}
            onChange={FormInput}
            name="username"
            type="text" 
            id='username'/>
            </div>
            <div className="inputs">
            <label htmlFor="password">Password</label>
            <input 
            value={formData.password}
            onChange={FormInput}
            name="password"
            type={showPass ? "text":"password"} 
            id='password'/>
            <i 
                onClick={() => ShowPass(true)}
                style={{display:showPass ? "none" : "block"}}
                className="fa-regular fa-eye showPass"
                
                ></i>
                <i 
                onClick={() => ShowPass(false)}
                style={{display:showPass ? "block" : "none"}}
                className="fa-regular fa-eye-slash unShowPass"></i>
            </div>
            <button>Sign In</button>
            <div className="forgot_pass">
                <Link to={"forgot"}>
                    Forgot password ?
                </Link>
            </div>
        </form>
        <p>Or</p>
        <div className="social_signin">
            <div className="image">
                <img src="https://lh3.googleusercontent.com/g4LSCiEc-F9muGnxxmu8pQpsbmDt0FUIYpicdDuuiXqzk8ygp_xGNNSTmCNfC0uTKWZO1AjlcseZ01j4rxa8aRlbrztLH2cw60m71A=w1000" alt="gmail" />
            </div>
            <div className="image">
            <img src="https://lh3.googleusercontent.com/g4LSCiEc-F9muGnxxmu8pQpsbmDt0FUIYpicdDuuiXqzk8ygp_xGNNSTmCNfC0uTKWZO1AjlcseZ01j4rxa8aRlbrztLH2cw60m71A=w1000" alt="gmail" />
            </div>
            <div className="image">
            <img src="https://lh3.googleusercontent.com/g4LSCiEc-F9muGnxxmu8pQpsbmDt0FUIYpicdDuuiXqzk8ygp_xGNNSTmCNfC0uTKWZO1AjlcseZ01j4rxa8aRlbrztLH2cw60m71A=w1000" alt="gmail" />
            </div>
        </div>
        <div className="dont_have">
            <span>Dont have an account yet?</span>
            <Link to="/signup">Sign Up</Link>
        </div>
        </div>

    </section>
  )
}

export default SignIn