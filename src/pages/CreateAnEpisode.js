import React, { useState } from 'react';
import Header from '../Signupcomponents/Header';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../Components/Inputcomponent';
import FileInput from '../Components/FileInput/FileInput';
import { toast } from 'react-toastify';
import Buttons from '../Components/Buttons';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisode = () => {
    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [audioFile,setAudiofile] = useState();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleAudiofile(file){
        setAudiofile(file);
    }

    async function handleSubmit(){
        setLoading(true);
        if((title,desc,audioFile,id)){
            try{
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef,audioFile);

                const audioURL = await getDownloadURL(audioRef);

                const episodeData = {
                    title:title,
                    description: desc,
                    audioFile: audioURL,
                }

                await addDoc(collection(db,"podcasts",id,"episodes"),episodeData);
                toast.success("Episode created successfully");
                setLoading(false);
                navigate(`/podcasts`);
                setTitle("");
                setDesc("");
                setAudiofile("");
            }
            catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            toast.error("All fields are required!!")
            setLoading(false);
        }
    }

    return(
        <div className='input-wrapper'>
            <Header/>
            <h1>Create Episode</h1>
            <InputComponent 
                state={title} 
                setState={setTitle} 
                placeholder="Enter the title" 
                type="text" 
                required={true} />

            <InputComponent 
                state={desc} 
                setState={setDesc} 
                placeholder="Describe about the episode"
                type="text" 
                required={true} />
             <FileInput
                accept={"audio/*"}
                id="audio-file"
                msg={"Choose Audio File"}
                fileHandlefunc={handleAudiofile}
             />
             <Buttons text={loading?"Loading...":"Create Episode"} onClick = {handleSubmit} disabled={loading}/>
        </div>
    )
}

export default CreateAnEpisode;