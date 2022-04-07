import { createContext, useState } from "react";

const ContentContext = createContext({});

function ContentContextProvider(props) {
    const [content, setContent] = useState({
        contentType: "Comics"
    });

    const contextReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case "SWAP_TYPE": {
                return setContent({
                    contentType: payload
                });
            }
            default:
                return content;
        }
    }

    content.getContentType = () => {
        return content.contentType;
    }

    return (
        <ContentContext.Provider value = {{content}}>
            props.children
        </ContentContext.Provider>

    )
}

export default ContentContext;
export { ContentContextProvider };