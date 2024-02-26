import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import Profilepage from './pages/Profilepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import React,{useEffect} from 'react';
import {auth,db,storage} from "./firebase";
import {setUser} from "./Slices/userSlice";
import {doc,setDoc} from "firebase/firestore";
import {useDispatch} from 'react-redux';
import PrivateRoutes from './Components/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import CreateAnEpisode from './pages/CreateAnEpisode';

function App() {
  const dispatch = useDispatch();


  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(auth, (user)=>{
      if(user){
        const unsubscribeSnapshot = onSnapshot(
        doc(db,"users",user.uid),
        (userDoc) => {
          if(userDoc.exists()){
            const userData = userDoc.data();
            dispatch(
              setUser({
                name:userData.name,
                email:userData.email,
                uid:user.uid,
              })
            );
          }
        },
        (error) => {
          console.log(error);
        }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    }
  },[]);
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/profile"  element={<Profilepage />}/>
            <Route path="/create-a-podcast"  element={<CreateAPodcast />}/>
            <Route path="/podcasts"  element={<PodcastsPage />}/>
            <Route path="/podcast/:id"  element={<PodcastDetailPage />}/>
            <Route path="/podcast/:id/create-episode"  element={<CreateAnEpisode />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;