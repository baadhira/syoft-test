import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryBtn } from "../components/Button/Button";
import { Text } from "../components/Input/Input";
import { H3, H5 } from "../components/Text/Text";
import { Flex } from "../components/UI/Flex/Flex";
import { BASE_URL } from "../BaseUrl";
import Alert from 'react-bootstrap/Alert';

import "./Login.scss";
import { DropDown } from "../components/Input/Input";

export const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [error_username, setErrorUsername] = useState("");

  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setloading] = useState(false);

  const [hide, setHide] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(username === ""){
      alert("Please enter username")
    }else if(username.length<5){
      alert("usrname should be atleast 5 characters")

    }else if(email === ""){
      alert("email field is required")
    }else if(!email.includes("@")){
      alert("Please enter valid email")
    }
    else if(!email.includes(".")){
      alert("Please enter valid email")
    }else if(password === ""){
      alert("Please enter valid password")
    }else if(repassword === ""){
    alert("Please enter confirm password")
  }else if(password !=repassword){
    alert("Passwords doesnot match")
  }else if(password.length < 5){
    alert("Password must be at least 5 characters")
  }
  else if(role=== ""){
  alert("role field is required")
}
else{
    
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== repassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        // setError("");
      }, 5000);
      alert("Passwords do not match");
    }

    try {
      setloading(true);

      setTimeout(() => {
        setloading(false);
      }, 3000);
       
      const { data } = await axios.post(
        `${BASE_URL}api/register/`,
        {
          username,
          phone_number,
          email,
          password,
          repassword,
          role
        },
        config
      );
      console.log("data",data)
      if(data.errors){
        console.log("error data",data.errors)
        if(data.errors.email){
          setShow(true)
          setError(data.errors.email)
        }else if (data.errors.username){
          setShow(true)
          setErrorUsername(data.errors.username)
        }else{
          return null
        }
      }else{
        console.log("data added successfully");
        localStorage.setItem("authToken", data.token.access);
      navigate('/signin')
      }

      

     

      // navigate("/signin");

    } catch (error) {
      // setError(error.response.data.error);
      setTimeout(() => {
        // setError("");
      }, 10);
    }

   
  }

    
  };
  console.log("set errror email",error);

  const CloseEmail=()=>{
    setShow(false)
    setError('')
  }


  return (
    <div className="login">
      <div className="login_container" style={{position: 'relative'}}>
        <H3 margin="20px">Create an Account ?</H3>
        {/* <h3></h3> */}

        <Flex width="90%">
          <Text
            placeholder="Enter your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
         

          <Text
            placeholder="Enter your Phone No."
            marginLeft="30px"
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Flex>
        <Text
          placeholder="Enter your Name"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <DropDown onChange={(e) => setRole(e.target.value)} width="90%">
          <option value="Select role">Select role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>

          <option value="Staff">Staff</option>
        </DropDown>
        <Text
          placeholder="Enter your password"
          type={hide ? "password" : "text"}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Text
          placeholder="Confirm your password"
          type={hide ? "password" : "text"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <i
          onClick={() => setHide(!hide)}
          class={hide ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
        ></i>
        <H5 color="red"></H5>
       {error_username && show?
       <>
       <div style={{position:"absolute",marginTop:"60%"}}>
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading >{error_username?error_username:null}</Alert.Heading>
     
    </Alert>
    </div>
    </>
      :null
  }

{error && show?
       <>
       <div style={{position:"absolute",marginTop:"30%"}}>


      <Alert variant="danger"onClose={() => CloseEmail()} dismissible>
        <Alert.Heading >{error!==""?error:null}</Alert.Heading>
       
      </Alert>
    </div>

    </>
      :null
  }

        <PrimaryBtn onClick={onSubmit} margin="30px 0" width="90%">
          Signup
        </PrimaryBtn>

        <Flex>
          <H5 color="black">Already have an account?</H5>

          <H5
            fontWeight="bold"
            cursor="pointer"
            margin="0 7px"
            color="dodgerblue"
            onClick={() => navigate("/signin")}
          >
            {" "}
            Login
          </H5>
        </Flex>
      </div>
    </div>
  );
};
