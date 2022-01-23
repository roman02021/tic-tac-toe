import Game from './pages/Game';
import Menu from './pages/Menu';
import ChooseMark from './layouts/ChooseMark';
import Button from './components/Button';
import { ReactComponent as Logo } from './assets/logo.svg';
import variables from './styles/_settings.scss';

function App() {
    return (
        <>
            <Menu>
                <Logo className="logo" />
                <ChooseMark />
                <Button
                    text="New game (vs CPU)"
                    fullWidth={true}
                    cross={true}
                />
                <Button
                    text="New game (vs Player)"
                    fullWidth={true}
                    cross={false}
                />
            </Menu>
        </>
    );
}

export default App;
