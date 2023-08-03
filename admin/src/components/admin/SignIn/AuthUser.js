import React, { useState } from 'react'
import axios from 'axios'

export default function AuthUser() {

    const isLoggedIn = () =>{
      const data = localStorage.getItem('token');
      if(data!=null){
        return true;
      }else{
        return false;
      }
    }

    const doLogout =()=>{
      localStorage.clear();
    }

    const getToken =() =>{
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser =() =>{
      const user = localStorage.getItem('user');
      const userDetails = JSON.parse(user);
      return userDetails;
  }

    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState();

    const getCurrentUserDetails =() =>{
      if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('user'));
      }else{
        return undefined;
      }
    }
    const getUserRole = () =>{
      let user = getCurrentUserDetails();
      console.log(user.authorities[0].authority);
      return user.authorities[0].authority;
    }

    const saveToken =(token,userDetails) =>{
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(userDetails));

        setToken(token);
        setUser(user);
    }

  const http = axios.create({
    baseURL: "http://localhost:9003",
    headers:{
        "Content-Type": "application/json"
    }
  });
  return{
    setToken:saveToken,
    token,
    doLogout,
    isLoggedIn,
    getUserRole,
    getUser,
    getToken,
    getCurrentUserDetails,
    http
  }
}
