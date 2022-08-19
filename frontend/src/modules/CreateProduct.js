import './Home.css'

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DangerBtn,
  PrimaryBtn,
  WhiteBtn,
} from "../components/Button/Button";
import jwt_decode from "jwt-decode";

import { Text, TextArea } from "../components/Input/Input";
import { Flex } from "../components/UI/Flex/Flex";
import { BASE_URL } from "../BaseUrl";

import { useNavigate } from "react-router-dom";
import { H3, H4 } from "../components/Text/Text";
import { getProducts } from './Method';

export const CreateProduct = ({ setCreateProduct }) => {
  const [productname, setProductName] = useState();
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState();
  const [category, setCategory] = useState();

  const [user, setUser] = useState();
  var token = localStorage.getItem("authToken");
  
  var decoded = jwt_decode(token);
  const navigate = useNavigate();


  var token = localStorage.getItem("authToken");
  // var decoded = jwt_decode(token);

  // console.log("token", token);
  
  const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${BASE_URL}api/product/`,
        {
            user:decoded.user_id,
            productname,
            price,
            stock,
            category
        },
        config
      )
      .then(() => {
        setCreateProduct(false);
        window.location.reload();
        navigate('/')
      }).then((error)=>{
        console.log("error create product",error);
      })
  };

  return (
    <div className="createProduct">
      <H4 fontWeight='bold'>Create Product</H4>
      <Text
        onChange={(e) => setProductName(e.target.value)}
        width="100%"
        placeholder="Enter Product name"
        type='text'
      />

   
      <Flex width="100%">
        <Text
          onChange={(e) => setStock(e.target.value)}
          margin="4px"
          placeholder="Enter Stock avilable"
          type="number"
          required
        />
        <Text
          onChange={(e) => setPrice(e.target.value)}
          margin="4px"
          placeholder="Enter price"
          type="number"
        />
      </Flex>
     

      <Text
         onChange={(e) => setCategory(e.target.value)}
        margin="4px"
        width="100%"
        placeholder="Enter category"

        type="text"
      />
     

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Submit
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setCreateProduct(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};