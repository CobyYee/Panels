import { useState } from 'react';

function UploadChapter(props) {
    const [file, setFile] = useState(null);

    return (
        <div id="upload_comic">
            <div id="upload_comic_label">
                Upload Chapter
            </div>
            <div id="upload_comic_inputs">
                <div id="upload_comic_parameters">
                    <div id="upload_comic_name_label">
                        Comic Name
                    </div>
                    <div id="upload_comic_image_label">
                        Chapter Name
                    </div>
                    <div id="upload_comic_tags_label">
                        Chapter File
                    </div>
                </div>
                <div id="upload_comic_fields">
                    <input id="upload_comic_name" type="text"></input> <br></br>
                    <input id="upload_chapter_name" type="text"></input> <br></br>
                    <input id="upload_chapter" type="file"></input>
                    <label id="uploaded_chapter_label" for="upload_chapter_image">Browse</label>
                    <label id="uploaded_chapter_label_label" for="uploaded_chapter_label"> [uploaded file name here]</label> 
                    <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" for="terms_checkbox">By uploading this chapter, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button">Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadChapter;