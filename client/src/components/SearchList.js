import ListCard from "./ListCard";

function SearchList(props) {
    const comics = props.comics;
    return ( 
       <div>
           {comics.map((comic, index) => (
               <ListCard comic={comic}/>
           ))}
       </div>     
    )
}

export default SearchList;
