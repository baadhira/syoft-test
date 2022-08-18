import { Home } from "./Home";
import { Signup } from "./Signup";
import { Login } from "./Signin"
export const elements=[
   
    {
        isAuth:true,
        path:'/', 
        element:<Home/>
    },
   
 
    {
        isAuth:false,
        path:'/signup', 
        element:<Signup/>
    },
    {
        isAuth:false,
        path:'/signin', 
        element:<Login/>
    },
   
  
]