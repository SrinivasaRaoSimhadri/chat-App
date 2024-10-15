import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx"
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import { Provider } from "react-redux";
import appStore from "./store/appStore.jsx";
import Body from "./components/Body.jsx";
const App = () => {
    return (
        <Provider store={appStore}>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<Body/>}>
                        <Route path="/api/auth/login" element={<Login/>}/>
                        <Route path="/api/auth/signup" element={<SignUp/>}/>
                        <Route path="/api/messages/send" element={<Home/>}/>
                        <Route path="/api/messages/:id" element={<Home/>}/>
                    </Route>                    
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}
export default App;