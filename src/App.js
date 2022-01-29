import Game from './pages/Game';
import Menu from './pages/Menu';
import { Outlet, Link } from 'react-router-dom';
import GlobalStyle from './styles/globalStyles';
import FontStyle from './styles/fontStyles';
// import { ReactComponent as Logo } from './assets/logo.svg';

import variables from './styles/_settings.scss';

function App() {
    return (
        <>
            <FontStyle />
            <GlobalStyle />
            <Outlet />
        </>
    );
}

export default App;
