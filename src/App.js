import News from './components/News';
import Navbar from './components/Navbar';
import { Component } from 'react';
// import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

export default class App extends Component{
   pagesize=15;
   apiKey = "fef5e4a26909407b8a1daefac1083d8d"
   state = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

   render(){
  return (
    <>
    {/* <Router>
     <Navbar/>
     <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress} 
      />
     <Routes>
         <Route Route exact path="/"><News key="general" pagesize={this.pagesize} country="in" category="general"/></Route>
          <Route exact path="/business"><News key="business" pagesize={this.pagesize} country="in" category="business"/></Route> 
          <Route exact path="/entertainment"><News key="entertainment" pagesize={this.pagesize} country="in" category="entertainment"/></Route>
          <Route exact path="/general"><News key="general" pagesize={this.pagesize} country="in" category="general"/></Route>
          <Route exact path="/health"><News key="health" pagesize={this.pagesize} country="in" category="health"/></Route>
          <Route exact path="/science"><News key="science" pagesize={this.pagesize} country="in" category="science"/></Route>
          <Route exact path="/sports"><News key="sports" pagesize={this.pagesize} country="in" category="sports"/></Route>
          <Route exact path="/technology"><News key="technology" pagesize={this.pagesize} country="in" category="technology"/></Route>
     </Routes> 
    </Router> */}
    <Navbar/>
    <News pagesize={this.pagesize} setProgress={this.setProgress} apiKey={this.apiKey} country='in' category='business'/>
    </>
    
  );
}
}
