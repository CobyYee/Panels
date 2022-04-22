import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

function UploadComic() {
    const [file, setFile] = useState(null);
    const tags = ["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Reincarnation", "Martial Arts", "Food", "Horror", "Sports"];
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("comic_name"));
    }

    const handleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        }
        else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    return (
        <Box id="upload_comic" component="form" noValidate onSubmit={handleSubmit}>
            <div id="upload_comic_label">
                Upload Comic
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
                    <input id="upload_comic_name" type="text" name="comic_name"></input> <br></br>
                    <input id="upload_comic_image" type="file" 
                           onChange={(event) => {
                               console.log(event.target.files[0]);
                               setFile(event.target.files[0]); }}>
                    </input>
                    <label id="uploaded_comic_image_label" for="upload_comic_image"> Browse </label>
                    <label id="uploaded_comic_image_label_label" for="uploaded_comic_image_label">{(file !== null) ? file.name : ""}</label>
                    <div id="tags">
                        {tags.map((tag, index) => {
                            return <button key={"tag-" + index} className = {(selectedTags.includes(tag)) ? "tag_button" : "tag_button_unselected"} value={index} onClick={() => handleTag(tag)}>{tag}</button>
                        })}
                    </div>
                    <input id="upload_comic_description" type="text" name="comic_description"></input> <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" for="terms_checkbox">By uploading this comic, I agree to Panels' terms and services</label> <br></br>
                    <Button id="upload_button" type="submit">Upload</Button>
                </div>
            </div>
        </Box>
    )
}

export default UploadComic;