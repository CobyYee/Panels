import { Navigate } from "react-router-dom";
import batePic from '../testimgs/bate.jpg';
import { useContext } from 'react';
import GlobalStoreContext from '../store';
import {useNavigate} from 'react-router-dom'

function ListCard(props) {
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate();

    function handleClick(event) {
        event.stopPropagation();
        console.log(props.work._id);
        store.loadComic(props.work._id);
        navigate('/comic/');
    }

    return (
        <div class="listcard">
            <img class="listcard_image" src={batePic} alt="Pic" onClick={handleClick}></img>
            <div style={{paddingLeft: '10px'}}>
                <div class="list_card_title" onClick={handleClick}>
                    {props.work.title}
                </div>
                <div class="list_card_genres">
                    {props.work.genres.map((genre, index) => (
                        <button key={ "genre-button-" + index + "-" + props.work._id } class={(index % 2 === 0) ? "genre_button_odd" : "genre_button_even"} value={index}>{genre}</button>
                    ))}
                </div>
                <div class="list_card_author">
                    {props.work.creatorName}
                </div>
                <div class="list_card_description">
                    {props.work.description}
                </div>
            </div>
        </div>
    )
}

export default ListCard;