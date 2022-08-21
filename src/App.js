
import './App.css';
import React, { Component } from 'react'
import NavBar from './component/NavBar';
import News from './component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  apikey = process.env.REACT_APP_NEWS_API
  state ={
    progress: 0
  }
  setProgress = (progress) =>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            height = {3}
            progress={this.state.progress}
            
          />
          <Routes>
            <Route path="/" element={<News setProgress = {this.setProgress} apikey = {this.apikey}    key="general" pageSize={9} category="general" />} />
            <Route path="/business" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="business" pageSize={9} category="business" />} />
            <Route path="/entertainment" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="entertainment" pageSize={9} category="entertainment" />} />
            <Route path="/health" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="health" pageSize={9} category="health" />} />
            <Route path="/science" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="science" pageSize={9} category="science" />} />
            <Route path="/sports" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="sports" pageSize={9} category="sports" />} />
            <Route path="/technology" element={<News setProgress = {this.setProgress} apikey = {this.apikey}  key="technology" pageSize={9} category="technology" />} />
          </Routes>


        </Router>
      </div>
    )
  }
}


