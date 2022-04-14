import { Navigate } from "react-router-dom";
import batePic from '../testimgs/bate.jpg';
import {useNavigate} from 'react-router-dom'

function ListCard(props) {
    let navigate = useNavigate();

    function handleClick(event) {
        event.stopPropagation();
        console.log("comic clicked");
        navigate('/comic/')
    }

    return (
        <div class="listcard">
            <img class="listcard_image" src={batePic} alt="Pic" onClick={handleClick}></img>
            <div style={{paddingLeft: '10px'}}>
                <div class="list_card_title" onClick={handleClick}>
                    {props.comic.title}
                </div>
                <div class="list_card_genres">
                    {props.comic.genres.map((genre, index) => (
                        <button class={(index % 2 === 0) ? "genre_button_odd" : "genre_button_even"} value={index}>{genre}</button>
                    ))}
                </div>
                <div class="list_card_author">
                    {props.comic.author}
                </div>
                <div class="list_card_description">
                    {props.comic.description}
                </div>
            </div>
        </div>
    )
}

export default ListCard;