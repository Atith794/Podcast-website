import React,{useState} from 'react';
import InputComponent from '../../Components/Inputcomponent/index';
import Buttons from '../../Components/Buttons/index';
import './styles.css';
import {auth,db,storage} from "../../firebase";
import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import {addDoc, collection, doc,setDoc} from "firebase/firestore";
import { useDispatch } from "react-redux";
import {setUser} from "../../Slices/userSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../../Components/FileInput/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Signup = ()=>{

    const [fullName,setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confpassword,setConfpassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [profilePic,setProfilepic] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProfilepic = (file) => {
        setProfilepic(file);
    }

    const handleSignup = async () => {
        // console.log("Signup");
        if(password === confpassword && password.length > 6){
            setLoading(true);
            try{
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password,
                );
                // console.log(userCredential); 

                // const profilePicref = ref(
                //     storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`
                // )

                // await uploadBytes(profilePicref,profilePic);
                // const profilePicURL = await getDownloadURL(profilePicref);
                // const profilePicData = {
                //     profilePic:profilePic,
                // }
                // const documentRef = await addDoc(collection(db,"users"),profilePicData);
                // setProfilepic(null);

                const user = userCredential.user;

                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                    
                });
                dispatch(
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
                <FileInput
                accept={"image/*"}
                id="profile_pic"
                msg={"Choose a profile picture"}
                fileHandlefunc={handleProfilepic}
             />
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