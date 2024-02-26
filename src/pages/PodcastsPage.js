import React, { useEffect, useState } from 'react';
import Header from '../Signupcomponents/Header/index';
import {setPodcasts} from '../Slices/podcastSlice';
import { useDispatch, useSelector } from 'react-redux';
import {db} from "../firebase";
import { query,onSnapshot,collection } from 'firebase/firestore';
import PodcastCard from '../Components/PodcastCard';
import InputComponent from '../Components/Inputcomponent/index'

const PodcastsPage = () => {

    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts.podcasts);
    const [search,setSearch] = useState("");
    const user = useSelector((state)=>state.user.user);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "podcasts")),
            (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) => {
                    podcastsData.push({id:doc.id, ...doc.data() });
                });
                dispatch(setPodcasts(podcastsData));
            },
            (error)=>{
                console.error("We have encountered a dispute:",error);
            }
        );

        return () => {
            unsubscribe();
        };
    },[dispatch]);

    const filteredResults = podcasts.filter((item)=>
        item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    );


    return(
        <div>
            <Header />
            <div className='input-wrapper'>
                <h1>Discover Podcasts</h1>
                <InputComponent 
                state={search} 
                setState={setSearch} 
                placeholder="Search by title" 
                type="text" 
                required={true} />
                {filteredResults.length > 0 ? 
                (<div className="podcasts-flex">
                    {filteredResults.map((item)=>{
                        return <PodcastCard 
                        key={item.id}
                        id={item.id}
                        displayImage={item.displayImage}
                        title={item.title}
                        createdBy = {user.name}
                        />
                    })}
                </div>):
                (<p>{search?"Podcast not found":"No podcasts to display"}</p>
                )}
            </div>
            
        </div>
    )
}

export default PodcastsPage;