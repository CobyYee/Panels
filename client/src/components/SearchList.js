import ListCard from "./ListCard";

function SearchList(props) {
    const comics = props.comics;
    return ( 
       <ul id="comic_list">
           {comics.map((comic, index) => (
               <li class="comic_item">
               <ListCard comic={comic}/>
               </li>
           ))}
       </ul>     
    )
}

export default SearchList;
