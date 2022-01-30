import { Outlet} from 'react-router-dom';
import React from 'react-dom';
import GlobalStyle from './styles/globalStyles';
import FontStyle from './styles/fontStyles';





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
