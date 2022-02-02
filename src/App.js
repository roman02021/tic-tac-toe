import { Outlet} from 'react-router-dom';
import React from 'react-dom';
import EndRoundModal from './layouts/EndRoundModal';
import GlobalStyle from './styles/globalStyles';
import FontStyle from './styles/fontStyles';
import Overlay from './components/Overlay';





function App() {
    return (
        <>
            <FontStyle />
            <GlobalStyle />
            <EndRoundModal/>
            <Overlay/>
            <Outlet />
        </>
    );
}

export default App;
