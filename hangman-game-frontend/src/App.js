import './App.css';
import { Hangman, Header } from './components';
import { Strings } from './constants/Constants';

function App() {
  return (
    <div className='app-main'>
      <Header title={Strings.TITLE} />
      <Hangman />
    </div>
  );
}

export default App;
