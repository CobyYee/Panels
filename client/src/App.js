import './App.css'
import { React } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { ContentContextProvider } from './content'

import {
    Banner,
    HomeWrapper,
    RegisterScreen,
    LoginScreen,
    PasswordRecoveryScreen,
    PasswordResetScreen,
    ListScreen
} from './components'

const App = () => {
    return (
        <BrowserRouter> 
            <GlobalStoreContextProvider>  
                <AuthContextProvider>
                    <ContentContextProvider>   
                        <Banner />
                        <Routes>
                            <Route exact path="/" element={< HomeWrapper />} />
                            <Route exact path="/register/" element={< RegisterScreen />} />
                            <Route exact path="/login/" element={< LoginScreen />} />
                            <Route exact path="/passwordrecovery/" element={< PasswordRecoveryScreen />} />
                            <Route exact path="/passwordreset/" element={< PasswordResetScreen />} /> 
                            <Route exact path="/listscreen/" element={< ListScreen />} />
                        </Routes>
                    </ContentContextProvider>
                </AuthContextProvider>
            </GlobalStoreContextProvider>
        </BrowserRouter>
    )
}

export default App