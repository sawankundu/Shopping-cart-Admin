import React, { useState } from 'react'
import './Register.css';
import FormInput from './components/FormInput';
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        fullName: "",
        phoneNumber:"",
        password: "",
        confirmPassword: ""
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMsg:"Username should be 3-16 characters",
            label: "Username",
            pattern:"^[A-Za-z0-9!@#$%^&*]{3,16}$",
            required:true
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMsg:"Enter your email address",
            label: "Email",
            required:true
        },
        {
            id: 3,
            name: "fullName",
            type: "text",
            placeholder: "Full Name",
            errorMsg:"Enter your name",
            label: "Full Name",
            required:true
        },
        {
            id: 4,
            name: "phoneNumber",
            type: "text",
            placeholder: "Phone ",
            errorMsg:"Please enter your number",
            label: "Phone",
            required:true
        },
        {
            id: 5,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMsg:"Passwords must be at least 6 characters.",
            label: "Password",
            pattern:`^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$`,
            required:true
        },
        {
            id: 6,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMsg:"Passwords don't match",
            label: "Confirm Password",
            pattern: values.password,
            required: true
        }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const register =(e) =>{
        e.preventDefault();
        if(inputs){
            let user = {username: values.username, email:values.email,fullName: values.fullName,phone:values.phoneNumber, password:values.password}
        // const {username, email,fullName,password} = values;
        const res = axios.post("http://localhost:9003/user/register",user);
        const data = res;
        console.log("DATA :"+data);
        // const data= await res.json();
        // console.log("inside register" +data );
        if(data){
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

        }else{
            window.alert("Invalid Successfull");
            console.log("Invalid Successfull");
        }
        }
    }

    console.log(values)
    return (
        <><h2>LOGO</h2>
        <div className='app'>
            
            <form method='POST' onSubmit={handleSubmit} >
                <h1>Create Account</h1>
                {inputs.map((input) => (
                    <FormInput key={input.id} 
                    {...input} value={values[input.name]} onChange={onChange} required/>
                ))}
                <button onClick={register} >Register</button>
                <div className='login'>
                    Already have an account? <Link to="/login" className='headerLink'>Sign in</Link>
            </div>
            </form>
            
        </div>
        </>
    )
}
