import './App.css'
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'

import {
    Banner,
    HomeScreen,
    RegisterScreen,
    LoginScreen,
    PasswordRecoveryScreen,
    PasswordResetScreen,
    ListScreen,
    BookmarksScreen,
    SettingsScreen,
    ProfileScreen,  
    ComicScreen,
    UploadComic,
    UploadChapter,
    Storyboard,
    ChapterScreen,
    EditChapterScreen,
    EditWorkScreen,
    StoryEditor
} from './components'

const App = () => {
    return (
        <BrowserRouter> 
            <AuthContextProvider>
                <GlobalStoreContextProvider>   
                    <Banner />
                    <Routes>
                        <Route exact path="/" element={< HomeScreen />} />
                        <Route exact path="/register/" element={< RegisterScreen />} />
                        <Route exact path="/login/" element={< LoginScreen />} />
                        <Route exact path="/passwordrecovery/:id/:token" element={< PasswordRecoveryScreen />} />
                        <Route exact path="/passwordreset/" element={< PasswordResetScreen />} /> 
                        <Route exact path="/listscreen/" element={< ListScreen/>} />
                        <Route exact path="/bookmarks/" element={< BookmarksScreen />} />
                        <Route exact path="/settings/" element={< SettingsScreen />} />
                        <Route exact path="/profile/:id" element={< ProfileScreen />} />
                        <Route exact path="/comic/:id" element={< ComicScreen />} />
                        <Route exact path="/story/:id" element={< ComicScreen />} />
                        <Route exact path="/uploadcomic" element={< UploadComic />} />
                        <Route exact path="/uploadstory" element={< UploadComic />} />
                        <Route exact path="/uploadchapter" element={< UploadChapter />} />
                        <Route exact path="/storyboard/" element={< Storyboard />} />
                        <Route exact path="/chapter/" element={< ChapterScreen />}/>
                        <Route exact path="/editchapter/" element={< EditChapterScreen />}/>
                        <Route exact path="/editwork/" element={< EditWorkScreen />}/>
                        <Route exact path="/storyeditor/" element={ <StoryEditor />} />
                    </Routes>
             </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App