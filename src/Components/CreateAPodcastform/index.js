import React,{ useState } from 'react';
import InputComponent from '../Inputcomponent/index';
import Buttons from '../Buttons/index';
import './styles.css';
import FileInput from '../FileInput/FileInput';
import { toast } from 'react-toastify';
import {auth,db,storage} from "../../firebase";
import {ref} from "firebase/storage";
import { uploadBytes,getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateAPodcastform = () => {

    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [displayImg,setDisplayImg] = useState();
    const [bannerImg,setBannerImg] = useState();
    const [loading,setLoading] = useState(false);
    
    async function handleSubmit(){
        if(title && desc && displayImg && bannerImg){
        try{
            setLoading(true);
            //Display Image upload
            const displayImageref = ref(
                storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(displayImageref,displayImg);
            const displayimageUrl = await getDownloadURL(displayImageref);

            //Banner image upload
            const bannerImageref = ref(
                storage,`podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(bannerImageref,bannerImg);
            const banimageUrl = await getDownloadURL(bannerImageref); 

            //Creating a doc in firebase storage
            const podcastData = {
                title:title,
                description:desc,
                bannerImage:banimageUrl,
                displayImage: displayimageUrl,
                createdBy: auth.currentUser.uid,  
            }

            //Creating a doc in firestore database
            const docRef = await addDoc(collection(db,"podcasts"),podcastData);
            setTitle("");
            setDesc("");
            setDisplayImg(null);
            setBannerImg(null);
            setLoading(false);
        }
        catch(e){
            toast.error(e.message);
            setLoading(false);
        }
            
        }
        else{
            toast.error("Please enter all the fields!!");
            setLoading(false);
        }
    }

    const handleDisplayimg = (file) => {
        setDisplayImg(file);
    }


    const handleBannerimg = (file) => {
        setBannerImg(file);
    }

    return(
        <div>
            <div className='ipdiv'>
            <h1>Create a Podcast</h1>
            <InputComponent 
                state={title} 
                setState={setTitle} 
                placeholder="Enter title" 
                type="text" 
                required={true} />
            <InputComponent 
                state={desc} 
                setState={setDesc} 
                placeholder="Enter description" 
                type="text" 
                required={true} />
            <FileInput
                accept={"image/*"}
                id="disp_image"
                msg={"Choose display image"}
                fileHandlefunc={handleDisplayimg}
             />
             <FileInput
                accept={"image/*"}
                id="banner_image"
                msg={"Choose banner image"}
                fileHandlefunc={handleBannerimg}
             />
            </div>
            <Buttons text={loading?"Loading...":"Submit"} onClick = {handleSubmit} disabled={loading}/>
        </div>
    )
}

export default CreateAPodcastform;