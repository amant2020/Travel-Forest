import React, {useEffect} from 'react';
import './App.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen"
import {auth} from "./firebase";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import Spain from "./countries/Spain";
//import Covid from './Covid.js'





function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth){
                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email
                }))
            }else {
                dispatch(logout());
            }
        });

        return unsubscribe
    }, [dispatch]);



  return (
    <div className="App">
        <Router>
            {!user ? (
                <LoginScreen/>
            ):(
                <Switch>
                    <Route path="/profile">
                        <ProfileScreen/>
                    </Route>
                    <Route exact path="/">
                        <HomeScreen/>
                    </Route>
                    <Route path="/spain">
                        <Spain/>
                    </Route>
                    {/*<Route path="/covid">*/}
                    {/*    <Covid/>*/}
                    {/*</Route>*/}

                </Switch>

            )}

        </Router>
    </div>
  );
}

export default App;
