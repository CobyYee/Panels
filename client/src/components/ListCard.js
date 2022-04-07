function ListCard(props) {
  return (
    <div class="listcard">
        <img class="listcard_image" src={"../public/" + props.comic.filename} alt="Nothing here"></img>
        <div>
            <h1 class="list_card_title">
                {props.comic.title}
            </h1>
            <div class="list_card_genres">
                {props.comic.genres.map((genre, index) => (
                    <button class={(index % 2 === 0) ? "genre_button_odd" : "genre_button_even"} value={index}>{genre}</button>
                ))}
            </div>
            <h2 class="list_card_author">
                {props.comic.author}
            </h2>
            <h2 class="list_card_description">
                {props.comic.description}
            </h2>
        </div>
    </div>
  )
}

export default ListCard;