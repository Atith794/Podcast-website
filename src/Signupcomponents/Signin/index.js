import React,{useState} from 'react';
import InputComponent from '../../Components/Inputcomponent/index';
import Buttons from '../../Components/Buttons/index';
import './styles.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {auth,db,storage} from "../../firebase";
import {doc,getDoc} from "firebase/firestore";
import {useDispatch} from "react-redux";
import {setUser} from "../../Slices/userSlice";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';


const Signin = ()=>{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);

    // const actionCodeSettings = {
        
    //     url: 'https://www.example.com/checkout?cartId=1234',
       
    //     handleCodeInApp: true,
    //     iOS: {
    //       bundleId: 'com.example.ios',
    //     },
    //     android: {
    //       packageName: 'com.example.android',
    //       installApp: true,
    //       minimumVersion: '12',
    //     },
        
    //     dynamicLinkDomain: 'coolapp.page.link',
    //   };

    // const forgotPassword = () => {
    //     const userEmail = 'user@example.com';
    //     getAuth()
    //     .generatePasswordResetLink(userEmail, actionCodeSettings)
    //     .then((link) => {
    //         return sendCustomPasswordResetEmail(userEmail, link);
    //     })
    //     .catch((error) => {
    //         toast.error(error);  });
    // }
    

    const handleSignin = async () => {
        console.log("Signin");
        setLoading(true);
        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db,"users",user.uid));
            const userData = userDoc.data(); 
            dispatch(
                setUser({
                name:userData.name,
                email:user.email,
                uid:user.uid,
            })
            );
            setLoading(false);
            toast.success("Login successfull!!");
            navigate("/profile");
    }
    catch (e) {
        if (e) {
            console.log("Error caught:", e);
            if (e.message) {
                toast.error(e.message);
            } else {
                toast.error("An unknown error occurred");
            }
        } else {
            console.error("An undefined error occurred in the catch block");
            toast.error("An undefined error occurred");
        }
        setLoading(false);
    }
    // catch(e){
    //     console.error(e);
    //     toast.error(e.message);
    //     setLoading(false);
    // }
}
    return(
        <div>
            <div className='input-wrapper'>
                <h1>SignIn</h1>
                <InputComponent 
                type="email" 
                state={email} 
                setState={setEmail} 
                placeholder="Enter your email" 
                required={true} />
                <InputComponent 
                type="password" 
                state={password} 
                setState={setPassword} 
                placeholder="Enter your Password" 
                required={true} />
            </div>
            <Buttons text={loading?"Loading...":"SignIn"} onClick = {handleSignin} disabled = {loading}/>
        </div>
    )
}

export default Signin;