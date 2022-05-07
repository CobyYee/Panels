import { useState, useContext } from 'react';
import GlobalStoreContext from '../store';


function UploadWork() {
    const {store} = useContext(GlobalStoreContext);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const tags = ["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Reincarnation", "Martial Arts", "Food", "Horror", "Sports"];
    const [selectedTags, setSelectedTags] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (title !== "") {
            store.createWork(title, file, description, selectedTags);
        }
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
        <div id="upload_work">
            <div id="upload_work_label">
                Upload {store.mode}
            </div>
            <div id="upload_work_inputs">
                <div id="upload_work_parameters">
                    <div id="upload_work_name_label">
                        {store.mode} Name
                    </div>
                    <div id="upload_work_image_label">
                        Cover Image
                    </div>
                    <div id="upload_work_tags_label">
                        Tags
                    </div>
                    <div id="upload_work_name_label">
                        Description
                    </div>
                </div>
                <div id="upload_work_fields">
                    <input id="upload_work_name" type="text" name="work_name" onChange={(event) => setTitle(event.target.value)}></input> <br></br>
                    <input id="upload_work_image" type="file" onChange={(event) => {handleFileUpload(event)}}></input>
                    <label id="uploaded_work_image_label" htmlFor="upload_work_image">Browse</label>
                    <label id="uploaded_work_image_label_label" htmlFor="uploaded_work_image_label">{fileName}</label>
                    <div id="tags">
                        {tags.map((tag, index) => {
                            return <button key={"tag-" + index} className = {(selectedTags.includes(tag)) ? "tag_button" : "tag_button_unselected"} value={index} onClick={() => handleTag(tag)}>{tag}</button>
                        })}
                    </div>
                    <input id="upload_work_description" type="text" name="work_description" onChange={(event) => setDescription(event.target.value)}></input> <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" htmlFor="terms_checkbox">By uploading this {store.mode}, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button" type="submit" onClick={handleSubmit}>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadWork;