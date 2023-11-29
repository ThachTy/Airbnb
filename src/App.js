import logo from './logo.svg';
import './App.css';
import UserLayout from './layouts/UserLayout';
import Test from './components/Test';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserLayout>
          <Routes>
            <Route path='' element={<Home />} />
          </Routes>
        </UserLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
