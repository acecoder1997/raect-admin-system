import React, {useState, useEffect} from 'react'
import {EditorState, convertToRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export default function NewsEditor(props) {
    const [editorState, setEditorState] = useState()
    const onEditorStateChange = (editorState) => setEditorState(editorState)
    const onEditorBlur = () => {
        const content = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        props.getContent(content)
    }

    useEffect(() => {
        const html = props.content;
        if (html === undefined) return
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }, [props.content])
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                onBlur={onEditorBlur}
            />
        </div>
    )
}
