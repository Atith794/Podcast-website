import { Link } from 'react-router-dom';
import './styles.css';

const PodcastCard = ({id,displayImage,title,createdBy}) => {
    return(
        <Link to={`/podcast/${id}`}>
            <div className='podcast-card'>
                <img className="display-image-podcast" src={displayImage}/>
                <p className="title-podcast">{title}</p>
                <h6 className="title-podcast">Created By: {createdBy}</h6>
            </div>
        </Link>
    );
}

export default PodcastCard;