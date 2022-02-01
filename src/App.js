import { Outlet} from 'react-router-dom';
import React from 'react-dom';
import Modal from './layouts/Modal';
import GlobalStyle from './styles/globalStyles';
import FontStyle from './styles/fontStyles';
import Overlay from './components/Overlay';





function App() {
    return (
        <>
            <FontStyle />
            <GlobalStyle />
            <Modal/>
            <Overlay/>
            <Outlet />
        </>
    );
}

export default App;
