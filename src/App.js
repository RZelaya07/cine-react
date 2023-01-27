import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Main,RouterComponent } from './components/Main/RouterComponent';

function App() {
  document.body.style.backgroundColor = "#2E4053";
  return (
    <RouterComponent/>
  );
}

export default App;
