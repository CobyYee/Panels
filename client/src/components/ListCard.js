import { useContext } from 'react';
import GlobalStoreContext from '../store';
import {useNavigate} from 'react-router-dom'
import AuthContextProvider from '../auth'

function ListCard(props) {
    const {store} = useContext(GlobalStoreContext)
    const {auth} = useContext(AuthContextProvider)
    let navigate = useNavigate();

    function handleClick(event) {
        event.stopPropagation();
        store.loadWork(props.work._id);
        navigate((store.mode === "comic") ? "/comic/" : "/story/" + props.work._id);
    }

    function handleAuthor(event) {
        event.stopPropagation();
        auth.loadProfile(props.work.creatorId);
        store.loadProfileWorks(props.work.creatorId);
        navigate('/profilescreen/')
    }

    return (
        <div class="listcard">
            <img class="listcard_image" src={props.cover} alt="" onClick={handleClick}></img>
            <div style={{paddingLeft: '10px'}}>
                <div class="list_card_title" onClick={handleClick}>
                    {props.work.title}
                </div>
                <div class="list_card_genres">
                    {props.work.genres.map((genre, index) => (
                        <button key={ "genre-button-" + index + "-" + props.work._id } class={(index % 2 === 0) ? "genre_button_odd" : "genre_button_even"} value={index}>{genre}</button>
                    ))}
                </div>
                <div class="list_card_author" onClick={handleAuthor}>
                    {"Author: " + props.work.creatorName}
                </div>
                <div class="list_card_description">
                    {props.work.description}
                </div>
            </div>
        </div>
    )
}

export default ListCard;