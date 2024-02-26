import {  collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase';
import Header from '../Signupcomponents/Header';
import Button from '../Components/Buttons/index';
import EpisodeDetails from '../Components/EpisodeDetails';
import AudioPlayer from '../Components/AudioPlayer';

const PodcastDetailPage = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [podcast , setPodcast] = useState({});
    const [episodes,setEpisodes] = useState([]);
    const [playingFile,setPlayingfile] = useState("");

    useEffect(() => {
        if(id){
            getData();
        }
    },[id]);

    const getData = async () => {
        try{
            const docRef = doc(db,"podcasts",id);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()){
                setPodcast({id:id, ...docSnap.data()});
                toast.success("Podcast found!");
            }
            else{
                toast.error("No such podcast");
                navigate("/podcasts");
            }
        }catch(e){
            toast.error("Podcast not found");
        }
    }

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot) => {
                const episodesData = [];
                querySnapshot.forEach((doc) => {
                    episodesData.push({id:doc.id,...doc.data()});
                });
                setEpisodes(episodesData);
            },
            (error) => {
                console.error(error);
            }
        );

        return () => {
            unsubscribe();
        };
    },[id]);

    return(
        <div>
            <Header />
            <div className = "input-wrapper">
                {podcast.id && (
                    <div>
                        <div style={{display:"flex", 
                        justifyContent:"space-between", 
                        alignItems:"center",
                        width:"100%",
                        margin:"1rem",
                        }}>
                            <h1 className='podcast-title'>{podcast.title}</h1>
                            {podcast.createdBy == auth.currentUser.uid && 
                            <Button 
                            style={{width:"150px", marginLeft: "27rem", marginBottom:"0px"}} 
                            text={"Create Episode"}
                            onClick = {()=>{
                                navigate(`/podcast/${id}/create-episode`);
                            }}
                            />}
                        </div>
                        <div className='podcast-banner-image'>
                        <img src={podcast.bannerImage}/>
                        </div>
                        <p className='podcast-description'>{podcast.description}</p>
                        <h1 className='podcast-title'>Episodes</h1>
                        {episodes.length > 0 ? (
                        <>
                            {
                                episodes.map((episode,index) => {
                                    return (
                                        <>
                                            <EpisodeDetails 
                                            title={episode.title}
                                            description={episode.description}
                                            index={index+1}
                                            audioFile={episode.audioFile}
                                            key={index}
                                            onClick={(file) => setPlayingfile(file)}
                                            />
                                            
                                        </>
                                    )
                                })
                            }
                        </>
                        )
                        :
                        (<p>No Episodes</p>)}
                    </div>
                )}
                {playingFile && <AudioPlayer audioSrc={playingFile} image={podcast.displayImage}/>}
            </div>
        </div>
    );
}

export default PodcastDetailPage;