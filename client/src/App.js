import './App.css'
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { ContentContextProvider } from './content'

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
    EditComicScreen
} from './components'

const App = () => {
    return (
        <BrowserRouter> 
            <GlobalStoreContextProvider>  
                <AuthContextProvider>
                    <ContentContextProvider>   
                        <Banner />
                        <Routes>
                            <Route exact path="/" element={< HomeScreen />} />
                            <Route exact path="/register/" element={< RegisterScreen />} />
                            <Route exact path="/login/" element={< LoginScreen />} />
                            <Route exact path="/passwordrecovery/" element={< PasswordRecoveryScreen />} />
                            <Route exact path="/passwordreset/" element={< PasswordResetScreen />} /> 
                            <Route exact path="/listscreen/" element={< ListScreen/>} />
                            <Route exact path="/bookmarks/" element={< BookmarksScreen />} />
                            <Route exact path="/settings/" element={< SettingsScreen />} />
                            <Route exact path="/profile/" element={< ProfileScreen />} />
                            <Route exact path="/comic/" element={< ComicScreen />} />
                            <Route exact path="/uploadcomic" element={< UploadComic />} />
                            <Route exact path="/uploadchapter" element={< UploadChapter />} />
                            <Route exact path="/storyboard/" element={< Storyboard />} />
                            <Route exact path="/chapter/" element={< ChapterScreen />}/>
<<<<<<< HEAD
                            <Route exact path="/editcomic/" element={< EditComicScreen />}/>
=======
>>>>>>> a07241b64acbdfbd6ddfc9c6ff665520c155910d
                        </Routes>
                    </ContentContextProvider>
                </AuthContextProvider>
            </GlobalStoreContextProvider>
        </BrowserRouter>
    )
}

export default App