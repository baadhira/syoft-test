import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DangerBtn,
  PrimaryBtn,
  WhiteBtn,
} from "../components/Button/Button";
import { Text, TextArea } from "../components/Input/Input";
import { Flex } from "../components/UI/Flex/Flex";
import "./Home.css";
import { BASE_URL } from "../BaseUrl";

import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getoneProduct } from "./Method";
import { H4 } from "../components/Text/Text";

export const EditProduct = ({ setEditProduct,productid }) => {
  
    const [productname, setProductName] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    const [category, setCategory] = useState();
  
    const [edit_product,setEdProduct] = useState();

  var token = localStorage.getItem("authToken");
  
  useEffect(() => {
    getoneProduct(productid).then((response) => {
        setEdProduct(response.data);
        
      })
  },[setEditProduct])
 


    const onSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(
        `${BASE_URL}api/product/${productid}/`,{
            productname,
            price,
            stock,
            category
        },
        config
      )
      .then(() => {
        setEditProduct(false);
        window.location.reload();
      });
  };

  return (
    <div className="createProduct">
         <H4 fontWeight='bold'>Edit Product</H4>
      <Text
      defaultValue={edit_product?.productname}
        onChange={(e) => setProductName(e.target.value)}
        width="100%"
        placeholder="Enter product name"
        type="text"
      />
    
      <Flex width="100%">
        <Text
          onChange={(e) => setPrice(e.target.value)}
      defaultValue={edit_product?.price}

          margin="4px"
          placeholder="Enter price"
          type="number"
        />
        <Text
          onChange={(e) => setStock(e.target.value)}
      defaultValue={edit_product?.stock}

          margin="4px"
          placeholder="Enter stock availability"
          type="number"
        />
      </Flex>
     

      <Text
      defaultValue={edit_product?.category}

        onChange={(e) => setCategory(e.target.value)}
        margin="4px"
        width="100%"
        placeholder="Enter categories"
        type="text"
      />
     

      <Flex>
        <PrimaryBtn onClick={onSubmit} margin="10px">
          Update
        </PrimaryBtn>
        <DangerBtn
          onClick={() => {
            setEditProduct(false);
          }}
          margin="10px"
        >
          Cancel
        </DangerBtn>
      </Flex>
    </div>
  );
};