import { Navigate } from "react-router-dom";

function ListCard(props) {

    function handleClick(event) {
        event.stopPropagation();
        console.log("comic clicked");
    }

    return (
        <div class="listcard">
            <img class="listcard_image" src={"../public/" + props.comic.filename} alt="" onClick={handleClick}></img>
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