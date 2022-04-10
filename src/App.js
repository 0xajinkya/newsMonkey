import React from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';

const App = () =>{
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
    return(
        <div>
          <Router>
          <LoadingBar 
          height={3} 
          color='#c200b4'
          progress={progress}
          />
          <Navbar/>
          
          <Routes>
          <Route exact path="/"   element={<News  setProgress={setProgress} apiKey={apiKey} key="general" pageSize={15} country="in" category="general"/>}></Route>
          <Route exact path="/business"   element={<News setProgress={setProgress} apiKey={apiKey}key="business" pageSize={15} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment"   element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={15} country="in" category="entertainment"/>}></Route>
          <Route exact path="/science"   element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={15} country="in" category="science"/>}></Route>
          <Route exact path="/sport"   element={<News setProgress={setProgress} apiKey={apiKey} key="sport" pageSize={15} country="in" category="sport"/>}></Route>
          <Route exact path="/technology"   element={<News setProgress={setProgress} apiKey={apiKey}key="technology" pageSize={15} country="in" category="technology"/>}></Route>
          <Route exact path="/health"   element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={15} country="in" category="health"/>}></Route>
          <Route exact path="/general"   element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={15} country="in" category="general"/>}></Route>
    
          </Routes>
          </Router>
        </div>
    )
  
    }
    export default App

