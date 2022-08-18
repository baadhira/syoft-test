
import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../BaseUrl';

export const getProducts =()=> {

  var token = localStorage.getItem("authToken");

  const config = {
      
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
    
   
    const response = axios.get(`${BASE_URL}api/product`,config)
    
  return response
}

export const getUsers =()=> {

    var token = localStorage.getItem("authToken");
  
    const config = {
        
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
      
     
      const response = axios.get(`${BASE_URL}api/user`,config)
      
    return response
  }

export const getoneProduct =(id)=> {

    var token = localStorage.getItem("authToken");
  
    const config = {
        
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
      
     
      const response = axios.get(`${BASE_URL}api/product/${id}`,config)
      
    return response
  }