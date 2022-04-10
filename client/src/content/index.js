import { createContext, useState } from "react";

const ContentContext = createContext({});

function ContentContextProvider(props) {
    const [content, setContent] = useState({
        contentType: "Comics"
    });
    
    content.setContentType = (content) => {
        setContent({
            contentType: content
        })
    }

    content.getContentType = () => {
        return content.contentType;
    }

    return (
        <ContentContext.Provider value = {{content}}>
            {props.children}
        </ContentContext.Provider>

    )
}

export default ContentContext;
export { ContentContextProvider };