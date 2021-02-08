import React from 'react'
import styled from 'styled-components';
import { Route } from 'react-router-dom'
import Navigator from './components/Navigator'
import Home from './components/Home'
import About from './components/About'
import Tour from './components/Tour'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import UserInfo from './components/UserInfo'

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
      <Route path="/tour" component={Tour}/>
      <Route path="/contact" component={Contact}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/userInfo" component={UserInfo}/>
    </GlobalStyles>
  );
}

export default App;
