import "./assets/styles/App.module.scss"
import {RecoilRoot} from 'recoil'
import {BrowserRouter} from 'react-router-dom'
import Router from './router'
import {ThemeProvider} from 'styled-components'
import {useState} from 'react'
import {darkTheme} from './utility/theme'

function App() {
  const [theme, setTheme] = useState(darkTheme)

  return (
    <RecoilRoot>
      <ThemeProvider theme={{...theme, setTheme}}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
