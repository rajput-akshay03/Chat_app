
import './App.css';
import HomePage from './pages/Home';
import {  Routes, Route } from "react-router-dom";
import ChatPage from './pages/chatPage';
function App() {
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={ <HomePage/>}/>
         <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
