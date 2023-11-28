import logo from './logo.svg';
import './App.css';
import UserLayout from './layouts/UserLayout';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <UserLayout>
        <Test />
      </UserLayout>
    </div>
  );
}

export default App;
