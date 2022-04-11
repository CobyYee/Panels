import { useState } from 'react';

function UploadComic() {
    const [file, setFile] = useState(null);
    const [tags, setTags] = useState(["Action", "Romance", "Fantasy", "Comedy", "Slice of Life", "Reincarnation", "Martial Arts",
                                            "Food", "Horror", "Sports"]);

    return (
        <div id="upload_comic">
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
                </div>
                <div id="upload_comic_fields">
                    <input id="upload_comic_name" type="text"></input> <br></br>
                    <input id="upload_comic_image" type="file"></input>
                    <label id="uploaded_comic_image_label" for="upload_comic_image">Browse</label>
                    <label id="uploaded_comic_image_label_label" for="uploaded_comic_image_label"> [uploaded file name here]</label>
                    <div id="tags">
                        {tags.map((tag, index) => {
                            return <button className = "tag_button" value={index}>{tag}</button>
                        })}
                    </div>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" for="terms_checkbox">By uploading this comic, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button">Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadComic;