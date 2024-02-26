import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../Signupcomponents/Header/index';
import Button from '../Components/Buttons/index';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';
import { toast } from 'react-toastify';


const Profilepage = () => {
    const user = useSelector((state)=>state.user.user);
    // const userr = useSelector((state) => state.userr.profilePic);
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
            <div className='profile-wrapper'>
                <h1>Profile page</h1>
                <h2>{user.name}</h2>
                <h2>{user.email}</h2>
                <h2>{user.uid}</h2>
                <Button text={"Logout"} onClick={handleLogout}/>
            </div>
        </div>
    )
}

export default Profilepage;