import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../Signupcomponents/Header/index';
import Button from '../Components/Buttons/index';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import { toast } from 'react-toastify';

const Profilepage = () => {
    const user = useSelector((state)=>state.user.user);
    if(!user){
        return <p>Loading....</p>;
    }
    const handleLogout = () => {
        signOut(auth)
        .then(()=>{
            toast.success("Logged Out");
        })
        .catch((err)=>{
            toast.error(err.message);
        });
    }
    return(
        <div>
            <Header />
            <h1>Profile page</h1>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button text={"Logout"} onClick={handleLogout}/>
        </div>
    )
}

export default Profilepage;