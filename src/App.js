
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTransition, animated } from 'react-spring';
import {
  GlobalStyle,
  theme,
} from './theme';

import Login_Screen from '../src/pages/login';
import Painel_Screen from '../src/pages/painel';

function App() {
  const loc = useLocation()

  const transitions = useTransition(loc, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%%,0,0)' },
    config: { mass: 1, tension: 800, friction: 120 }
  })

  return transitions((props, item) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <animated.div style={{...props, overflow: 'hidden'}}>
        <Routes location={item} key={`${item}`} >
          <Route path="/" exact element={<Login_Screen />} />
          <Route path="/painel" index element={<Painel_Screen />} />
        </Routes>
      </animated.div>

    </ThemeProvider>
  ))
}

export default App;
