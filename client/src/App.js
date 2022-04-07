import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import { ContentContextProvider } from './content'
import {
    Banner,
    HomeWrapper,
    RegisterScreen,
    LoginScreen
} from './components'

const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <ContentContextProvider>
                    <GlobalStoreContextProvider>              
                        <Banner />
                        <Switch>
                            <Route path="/" exact component={HomeWrapper} />
                            <Route path="/register/" exact component={RegisterScreen} />
                            <Route path="/login/" exact component={LoginScreen} />
                            <Route path="/passwordrecovery/" exact component={PasswordRecoveryScreen} />
                            <Route path="/passwordreset/" exact component={PasswordResetScreen} /> 
                        </Switch>
                    </GlobalStoreContextProvider>
                </ContentContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App