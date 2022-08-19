import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DangerBtn, DarkBtn, IconBtn, PrimaryBtn, WhiteBtn } from "../components/Button/Button";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { getProducts, getUsers } from "./Method";
import { CreateProduct } from "./CreateProduct";
import { EditProduct } from "./EditProduct";
import jwt_decode from "jwt-decode";

import './Home.css'
import { H2 } from "../components/Text/Text";


export const Home = () => {
  const [datas,setData] = useState([]);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [logindata, setLogindata]=useState("")
  const [product, setProduct] = useState();
  const [createProduct, setCreateProduct] = useState(false);
  const [productid, setProductid] = useState();
  const [editproduct, setEditProduct] = useState(false);
  const [user, setUser] = useState();
  

  useEffect(() => {
    getUsers()
    .then((response)=>{
        setUser(response.data)
    })
   
  },[])
  
  const EditPro = (productid) => {
    setProductid(productid);
    setEditProduct(true);
  };

  var token = localStorage.getItem("authToken");
 if(token !== null){
  var decoded = jwt_decode(token);

 }
useEffect(() => {
  if (token===null){
    navigate('signin')
  }
})
  console.log("decoded",decoded);
 
  const currentUser=user?.filter(fil=>fil.id=== decoded.user_id).map(data=>data.role)
  console.log("user role",currentUser);




  const User=()=>{
    const getUser=localStorage.getItem('authToken');
    console.log("getUser", getUser);
    if(getUser && getUser.length){
      setLogindata(getUser)
    }
  } 


  useEffect(() => {
    User()
  }, []);

  useEffect(() => {
    getProducts().then((response) => {
        setProduct(response.data);

    });
},[setProduct]);




  const navigate = useNavigate();

  const logoutHandler = () => {

    localStorage.removeItem("authToken");

    navigate("/signin")

  }


  return (
    <div>
      {
      logindata===0 || token ===null ?
      <>
      <div style={{display: 'flex', flexDirection: 'column',justifyContent:"center",alignItems:"center"}}>
      <h1>
        Login to account 
      </h1>
      <button className="btn btn-primary" onClick={()=>navigate("/signin")}>Redirect Login Page</button>
      </div>
      {navigate('/signin')}
      </>:
       token !==null && currentUser=="Staff"?
      <div style={{display: 'flex', flexDirection: 'column',justifyContent:"center",alignItems:"center"}}>
      <h1>
        You have no permission to view this page
      </h1>
      <button className="btn btn-primary" onClick={()=>navigate("/signin")}>Redirect Login Page</button>
      </div>

      :
      <>
        <h2 className="text-center mt-5">Welcome {currentUser?currentUser:null}</h2>

      <div style={{display: 'flex', flexDirection:"row",justifyContent:"center",alignItems:"center",padding:"50px"}}>
      {createProduct ? (
    <div className="bg_black">
      <CreateProduct setCreateProduct={setCreateProduct} />
    </div>
  ) : null}

{editproduct ? (
        <div className="bg_black">
          <EditProduct productid={productid} setEditProduct={setEditProduct} />
        </div>
      ) : null}
     
     {currentUser && currentUser=="Admin"?
   
        <PrimaryBtn marginLeft="20px" onClick={() => setCreateProduct(true)}><i style={{marginRight:"5px"}}className="fa-solid fa-plus"></i> Product</PrimaryBtn>
        :null
}

        <DangerBtn onClick={logoutHandler} marginLeft="20px">Logout</DangerBtn>

      </div>
      {
        product && product.length!=0?
            product ?
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ width: "60%", margin: "auto" }}
      > 
     
     
        <thead>
          <tr>
       
            <th>ProductName</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>


          </tr>
        </thead>
        <tbody>
           
            {product?.map(data=>(
          <tr>
            <td>{data.productname}</td>
            <td>{data.price}</td>
            <td>{data.stock}</td>

            <td>{data.category}</td>
            
            <td><WhiteBtn  onClick={(productid) => EditPro((productid = data.id))} marginLeft="20px">Edit</WhiteBtn></td>



            
          </tr>
          ))}
          
            
          
       
        </tbody>
      </Table>

      : <h1 style={{color:"grey"}} className="text-center">Loading...</h1>
    :
    <h1 style={{color:"grey"}} className="text-center">No products added</h1>}
      </>
      }
    </div>

  );
};