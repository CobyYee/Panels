import { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import GlobalStoreContext from '../store';


function EditComicScreen() {
    const {store} = useContext(GlobalStoreContext);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const tags = ["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Reincarnation", "Martial Arts", "Food", "Horror", "Sports"];
    const [selectedTags, setSelectedTags] = useState((store.work !== null) ? store.work.genres : []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('comic_name'));
        console.log(data.get('comic_description'));
    }

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
        <Box id="upload_comic" component="form" noValidate onSubmit={handleSubmit}>
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
                        Tags
                    </div>
                    <div id="upload_comic_name_label">
                        Description
                    </div>
                </div>
                <div id="upload_comic_fields">
                    <input id="upload_comic_name" type="text" name="comic_name" defaultValue={store.work != null ? store.work.title : ""}></input> <br></br>
                    <input id="upload_comic_image" type="file" onChange={(event) => {handleFileUpload(event)}}></input>
                    <label id="uploaded_comic_image_label" for="upload_comic_image"> Browse </label>
                    <label id="uploaded_comic_image_label_label" for="uploaded_comic_image_label">{fileName}</label>
                    <div id="tags">
                        {tags.map((tag, index) => {
                            return <button key={"tag-" + index} className = {(selectedTags.includes(tag)) ? "tag_button" : "tag_button_unselected"} value={index} onClick={() => handleTag(tag)}>{tag}</button>
                        })}
                    </div>
                    <input id="upload_comic_description" type="text" name="comic_description" defaultValue={store.work != null ? store.work.description : ""}></input> <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" for="terms_checkbox">By editing this comic, I agree to Panels' terms and services</label> <br></br>
                    <Button id="upload_button" type="submit">Save</Button>
                </div>
            </div>
        </Box>
    )
}

export default EditComicScreen;