import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';

function UploadChapter() {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [text, setText] = useState("");

    const navigate = useNavigate();
    function handleSubmit() {
        if (name !== "") {
            if (store.mode === "comic") {
                store.createComicChapter(store.work._id, name, files);
            }
            else {
                store.createStoryChapter(store.work._id, name, text);
            }
            navigate(`/profile/${auth.session._id}`)
        }
    }

    function handleFileUpload(event) {
        let arr = [];
        let files = Array.from(event.target.files);
        files.forEach((file) => {
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
        setFileNames(files.map(file => file.name));
    }

    function handleChange(content, delta, source, editor) {
        setText(editor.getContents())
    }

    let display =
        <div>
            <input id="upload_chapter" type="file" multiple="multiple" onChange={(event) => {handleFileUpload(event)}}></input>
            <label id="uploaded_chapter_label" htmlFor="upload_chapter">Browse</label>
            <label id="uploaded_chapter_label_label" htmlFor="uploaded_chapter_label">{fileNames.join(", ")}</label> 
            <br></br>
        </div>

    if (store.mode === "story") {
        display = 
            <div>
                <ReactQuill id="story_creator" className="q1-toolbar" onChange={(content, delta, source, editor) => handleChange(content, delta, source, editor)}/>
                <br/><br/>
            </div>
    }

    return (
        <div id="upload_work">
            <div id="upload_work_label">
                Upload Chapter
            </div>
            <div id="upload_work_inputs">
                <div id="upload_work_parameters">
                    <div id="upload_work_name_label">
                        {store.mode} Name
                    </div>
                    <div id="upload_work_image_label">
                        Chapter Name
                    </div>
                    <div id="upload_work_tags_label">
                    {
                        (store.mode === "comic" ? "Upload File(s)" : "Create Story")
                    }
                    </div>
                </div>
                <div id="upload_work_fields">
                    <input readOnly id="upload_work_name" type="text" value={(store.work !== null) ? store.work.title : ""}></input> <br></br>
                    <input id="upload_chapter_name" type="text" onChange={(event) => setName(event.target.value)}></input> <br></br>
                    { display }
                    <input id="terms_checkbox" type="checkbox"></input>
                    <label id="terms_label" htmlFor="terms_checkbox">By uploading this chapter, I agree to Panels' terms and services</label> <br></br>
                    <button id="upload_button" onClick={() => handleSubmit()}>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadChapter;