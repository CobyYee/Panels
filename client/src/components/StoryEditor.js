import ReactQuill from 'react-quill'
import Quill from 'quill'
import 'react-quill/dist/quill.snow.css';

<link rel="stylesheet" href="node_modules/react-quill/dist/quill.snow.css"/>;

export default function StoryEditor() {

    var quill = <ReactQuill theme = "snow" id = "quill-textbox" onChange = {update} defaultValue = "Begin typing your story!"/>
    console.log(quill.getContents())
    update();

    function update(delta) {
        var contents = quill.value;
        console.log('contents', contents);
        var html = "contents = " + JSON.stringify(contents, null, 2);
        if (delta) {
            console.log('change', delta)
            html = "change = " + JSON.stringify(delta, null, 2) + "\n\n" + html;
        }
    }

    return (
        <div id = "story-editor">
            {quill}
        </div>
    )
}