import React, { useState } from 'react'
import '../assets/css/signup/SignUp.css'
import { Link ,useNavigate } from 'react-router-dom'
import axios from 'axios'
const SignUp = () => {
    const redirect = useNavigate()
    const [error,setError] = useState("")
    const [success,setSuccess] = useState("")
    const [showPass1,setShowPass1] = useState(false)
    const [showPass2,setShowPass2] = useState(false)


    const [formData,setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })
    const InputHandle = (e) => {
        const {value,name} = e.target
        setFormData(prev => ({...prev , [name]: value}))
    }
    const FormSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        axios.post('http://localhost:5000/register',formData)
        .then(res => {
            console.log(res)
            redirect('/signin')
        })
        .catch(e => {
            setError(e.response.data.error)
            console.log(e.response.data.error)
        })
    }

    // pass handle
    const ShowPass = (inputTarget) => {
        if(inputTarget === 1) {
            setShowPass1(true)
        } else {
            setShowPass2(true)
        }
    }
    const UnShowPass = (inputTarget) => {
        if(inputTarget === 1) {
            setShowPass1(false)
        } else {
            setShowPass2(false)
        }
    }
    // pass handle

  return (
    <section className='sign_up_container'>
        <h1>Sign up</h1>
        <form action="" className='sign_up_form' onSubmit={FormSubmit}>
            {
                error&&
                <div className='error'>
                <span>{error}</span>
                <i className="fa-solid fa-xmark"  onClick={() => {
                    setError("")
                }}></i>
                </div>
            }
            <div className='input_div'>
                <label htmlFor="username">username</label>
                <input 
                value={formData.username}
                onChange={InputHandle}
                type="text" 
                name="username" 
                id="username" />
            </div>
            <div className='input_div'>
                <label htmlFor="email">Email</label>
                <input 
                value={formData.email}
                onChange={InputHandle}
                type="email" 
                name="email" 
                id="email" />
            </div>
            <div className='input_div'>
                <label htmlFor="password">password</label>
                <input 
                value={formData.password}
                onChange={InputHandle}
                type={showPass1 ? "text" : "password"} 
                name="password" 
                id="password" />
                <i 
                onClick={() => ShowPass(1)}
                style={{display:showPass1 ? "none" : "block"}}
                className="fa-regular fa-eye showPass"></i>
                <i 
                onClick={() => UnShowPass(1)}
                style={{display:showPass1 ? "block" : "none"}}
                className="fa-regular fa-eye-slash unShowPass"></i>
            </div>
            <div className='input_div'>
                <label htmlFor="password2">confirm password</label>
                <input 
                value={formData.password2}
                onChange={InputHandle}
                type={showPass2 ? "text" : "password"}  
                name="password2" 
                id="password2" />
                <i 
                onClick={() => ShowPass(2)}
                style={{display:showPass2 ? "none" : "block"}}
                className="fa-regular fa-eye showPass"
                
                ></i>
                <i 
                onClick={() => UnShowPass(2)}
                style={{display:showPass2 ? "block" : "none"}}
                className="fa-regular fa-eye-slash unShowPass"></i>
            </div>
            <button className='sign_up_btn'>Sign up</button>
            <span className='or'>or</span>
        </form>
        <div className='other_sign_up'>
            <button>Email</button>
            <button>Facebook</button>
            <button>Insta</button>
        </div>
        <div className="sign_in_">
            <span>Already have an account?</span>
            <Link to="/signin">Sign In</Link>
        </div>
    </section>
  )
}

export default SignUp