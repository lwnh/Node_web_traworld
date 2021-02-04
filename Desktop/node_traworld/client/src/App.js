import React from 'react'
import styled from 'styled-components';
import { Route } from 'react-router-dom'
import Navigator from './components/Navigator'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Contact from './components/Contact'
import Signup from './components/Signup'

const GlobalStyles = styled.div`
  @import url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
  font-family: 'Noto Sans KR', sans-serif;
`;

function App() {

  return (
    <GlobalStyles>
      <Navigator />
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/signup" component={Signup}/>
    </GlobalStyles>
  );
}

export default App;
