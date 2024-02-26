import React,{useState} from 'react';
import './styles.css';

const FileInput = ({type,accept,id,msg,fileHandlefunc}) => {
    const[fileSelected,setFileselected] = useState("");

    const handleChange = (e) => {
        setFileselected(e.target.files[0].name);
        fileHandlefunc(e.target.files[0]);
    }


    return(
        <div className={`inp-label ${!fileSelected && "labeldisp"}`}>
            <label htmlFor={id}>
                {fileSelected?`${fileSelected} is selected`: msg }
            </label>
            <input type="file" accept={accept} style={{display:'none'}} id={id} onChange={handleChange} />
        </div>
    )
}

export default FileInput;