import React,{useState} from 'react';
import InputComponent from '../../Components/Inputcomponent/index';
import Buttons from '../../Components/Buttons/index';
import './styles.css';
import {auth,db,storage} from "../../firebase";
import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import {doc,setDoc} from "firebase/firestore";
import { useDispatch } from "react-redux";
import setUser from "../../Slices/userSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = ()=>{

    const [fullName,setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confpassword,setConfpassword] = useState("");
    const [loading,setLoading] = useState(false);

    const abc = useDispatch();
    const navigate = useNavigate();

    const handleSignup = async () => {
        console.log("Signup");
        if(password === confpassword && password.length > 6){
            setLoading(true);
            try{
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log(userCredential);    
                const user = userCredential.user;

                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                });
                // navigate("/profile");  Remove this line
                console.log(user);
                abc(
                    setUser({
                        name:fullName,
                        email:user.email,
                        uid:user.uid,
                    })
                );
                setLoading(false);
                toast.success("Authentication successfull!!");
                navigate("/profile");
            } catch(e){
                console.log(e);
                setLoading(false);
                toast.error(e.message);
            }
        }
        else{
            if(password != confpassword){
                toast.error("Passwords should match!!");
                setLoading(false);
            }
            else if(password.length <= 6){
                toast.error("Password should contain at least 7 characters");
                setLoading(false);
            }
        }
    }

    return(
        <div>
            <div className='input-wrapper'>
                <h1>SignUp</h1>
                <InputComponent 
                state={fullName} 
                setState={setFullname} 
                placeholder="Enter your name" 
                type="text" 
                required={true} />
                <InputComponent 
                state={email} 
                setState={setEmail} 
                placeholder="Enter your email"
                type="email" 
                required={true} />
                <InputComponent 
                state={password} 
                setState={setPassword} 
                placeholder="Enter your Password"
                type="password" 
                required={true} />
                <InputComponent 
                state={confpassword} 
                setState={setConfpassword} 
                placeholder="Confirm your Password"
                type="password" 
                required={true} />
            </div>
            <Buttons text={loading?"Loading...":"SignUp"} onClick = {handleSignup} disabled={loading}/>
        </div>
    )
}

export default Signup;