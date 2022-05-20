import News from './components/News';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
    <Navbar/>
    <News pagesize={15}/>
    </>
    
  );
}

export default App;
//b5249a0b35074894a618085074273439