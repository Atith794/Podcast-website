import React from "react";
import Button from "../Buttons";

const EpisodeDetails = ({title,description,audioFile,onClick,index}) => {
    return(
        <div style={{width:"100%"}}>
            <h1 style={{textAlign:"left", marginBottom:0}}>{index}.{title}</h1>
            <p style={{marginLeft:"1.0rem"}}>{description}</p>
            <Button 
            text={"Play"} 
            style={{width:"6rem", marginBottom:"2rem"}}
            onClick={()=>onClick(audioFile)}/>
        </div>
    )
}

export default EpisodeDetails;