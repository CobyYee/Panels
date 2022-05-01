import { useState, useContext, useEffect } from 'react';
import GlobalStoreContext from '../store';
import { useNavigate } from 'react-router-dom'


function EditComicScreen() {
    const {store} = useContext(GlobalStoreContext);
    let navigate = useNavigate()

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const tags = ["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Reincarnation", "Martial Arts", "Food", "Horror", "Sports"];
    const [selectedTags, setSelectedTags] = useState([]);

    function handleSubmit() {
        //MUST TEST IF COVER UPLOADING WORKS
        //let newFile = (file === null) ? store.work.cover : file;
        let newFile = store.work.cover;
        store.updateComic(title, newFile, description, selectedTags);
        navigate("/comic/" + store.work._id);
    }

    useEffect(() => {
        if (store.work !== null) {
            setTitle(store.work.title);
            setDescription(store.work.description);
            setSelectedTags(store.work.genres);
        }
    }, [store.work])

    const handleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        }
        else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    function handleFileUpload(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function() {
            setFileName(event.target.files[0].name)
            setFile(reader.result);
        }
        reader.onerror = function (error) {
            console.log("File onload error: " + error);
        }
    }

    return (
        <div id="upload_comic">
            <div id="upload_comic_label">
                Edit Comic
            </div>
            <div id="upload_comic_inputs">
                <div id="upload_comic_parameters">
                    <div id="upload_comic_name_label">
                        Comic Name
                    </div>
                    <div id="upload_comic_image_label">
                        Cover Image
                    </div>
                    <div id="upload_comic_tags_label">
                        Reselect Tags
                    </div>
                    <div id="upload_comic_name_label">
                        Description
                    </div>
                </div>
                <div id="upload_comic_fields">
                    <input id="upload_comic_name" 
                           type="text" 
                           defaultValue={title} 
                           onChange={(event) => setTitle(event.target.value)}>
                    </input> 
                    <br></br>
                    <input id="upload_comic_image" type="file" onChange={(event) => {handleFileUpload(event)}}></input>
                    <label id="uploaded_comic_image_label" htmlFor="upload_comic_image"> Browse </label>
                    <label id="uploaded_comic_image_label_label" htmlFor="uploaded_comic_image_label">{fileName}</label>
                    <div id="tags">
                        {tags.map((tag, index) => {
                            return <button key={"tag-" + index} 
                                           className = {(selectedTags.includes(tag)) ? "tag_button" : "tag_button_unselected"} 
                                           value={index} 
                                           onClick={() => handleTag(tag)}>{tag}
                                    </button>
                        })}
                    </div>
                    <input id="upload_comic_description" type="text" defaultValue={description} onChange={(event) => setDescription(event.target.value)}></input> <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" htmlFor="terms_checkbox">By editing this comic, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button" type="submit" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditComicScreen;