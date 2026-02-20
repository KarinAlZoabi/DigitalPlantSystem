import { useState } from 'react'
import './App.css'
import Header from './components/general/NavBar'
import Landing from './components/landing'
import UserDashboard from './components/userDashboard'
import { COLORS } from './styles/colors'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${COLORS.backgroundGreen};
    font-family: 'Poppins', sans-serif;
  }
`;

function App() {

  return (
    <>
    <GlobalStyle />
    {/* <Landing/> */}
    <UserDashboard/>
      
    </>
  )
}

export default App
