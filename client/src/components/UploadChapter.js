import { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';

function UploadChapter() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");

    const navigate = useNavigate();
    function handleSubmit() {
        store.createComicChapter(store.work._id, name, files);
        navigate(`/profile/${auth.session._id}`)
    }

    function handleFileUpload(event) {
        let arr = [];
        let files1 = Array.from(event.target.files);
        files1.forEach((file) => {
            let reader = new FileReader();            
            reader.readAsDataURL(file);
            reader.onload = function() {
               // setFiles([...files, reader.result]);
               arr.push(reader.result)
            }
            reader.onerror = function() {
                console.log("reader onload error")
            }
        })
        setFiles(arr);
    }

    return (
        <div id="upload_comic">
            <div id="upload_comic_label">
                Upload Chapter
            </div>
            <div id="upload_comic_inputs">
                <div id="upload_comic_parameters">
                    <div id="upload_comic_name_label">
                        {store.mode} Name
                    </div>
                    <div id="upload_comic_image_label">
                        Chapter Name
                    </div>
                    <div id="upload_comic_tags_label">
                        Upload File(s)
                    </div>
                </div>
                <div id="upload_comic_fields">
                    <input readonly="readonly" id="upload_comic_name" type="text" value={(store.work !== null) ? store.work.title : ""}></input> <br></br>
                    <input id="upload_chapter_name" type="text" onChange={(event) => setName(event.target.value)}></input> <br></br>
                    <input id="upload_chapter" type="file" multiple="multiple" onChange={(event) => {handleFileUpload(event)}}></input>
                    <label id="uploaded_chapter_label" for="upload_chapter">Browse</label>
                    <label id="uploaded_chapter_label_label" for="uploaded_chapter_label">{(files !== null) ? files.map((file) => { return file.name }) : ""}</label> 
                    <br></br>
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" for="terms_checkbox">By uploading this chapter, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button" onClick={() => handleSubmit()}>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadChapter;