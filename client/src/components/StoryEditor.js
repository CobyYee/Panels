import Quill from 'quill'
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react'

export default function StoryEditor() {

    useEffect(() => {
        var Delta = Quill.import('delta')
        var quill = new Quill('#story-editor', {
            formats: {
                'background': 'white'
            },
            placeholder: 'Begin creating your story',
            theme: 'snow'
        })
        var change = new Delta()
        quill.on('text-change', function(delta) {
            console.log(delta);
        })
    }, [])

    return (
        <div id = "story-editor"></div>
    )
}