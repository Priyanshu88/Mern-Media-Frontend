import React from 'react';
import './App.css';
import { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from "./components/NavBar";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { initialState,reducer } from './reducers/userReducer';
import OtherUserProfile from './pages/OtherUserProfile';
import Postsfromfollowing from './pages/Postsfromfollowing';

export const UserContext = createContext();


const CustomRouting = () => {
  
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      dispatch({ type: "USER", payload: "userInfo" });
      // navigate("/"); // user logged in so redirect to home
    }
    else {
      navigate("/login"); // user not logged in so redirect to login
    }
  }, []); // called when component mounts and get called only once

  return (
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route path='/profile/:userId' element={<OtherUserProfile/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/postsfromfollowing' element={<Postsfromfollowing/>}/>
        </Routes>

  );
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <UserContext.Provider value={{state: state, dispatch: dispatch}}>
      <Router>
        <NavBar/>
        <CustomRouting/>
      </Router>    
    </UserContext.Provider>
  );
}

export default App;