import React,{useState} from 'react';
import Header from '../Signupcomponents/Header/index';
import Signup from '../Signupcomponents/Signup/index';
import Signin from "../Signupcomponents/Signin/index";
import "./styles.css";


const SignUpPage = () => {
    const[flag,setFlag] = useState(false);
    

    return(
        <div>
            
            <Header />
            {!flag?<Signup />:<Signin/>}
            {!flag?<p className="ptag" onClick={()=>setFlag(!flag)}>Already have an account? SignIn</p>:
            <p className="ptag" onClick={()=>setFlag(!flag)}>Don't have an account? SignUp</p>}
        </div>
    )
}

export default SignUpPage;