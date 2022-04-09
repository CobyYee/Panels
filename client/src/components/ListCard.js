function ListCard(props) {
  return (
    <div class="listcard">
        <img class="listcard_image" src={"../public/" + props.comic.filename} alt=""></img>
        <div style={{paddingLeft: '10px'}}>
            <div class="list_card_title">
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