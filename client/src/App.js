import logo from './logo.svg';
import './App.css';
import AllRoutes from './routes/AllRoutes';

function App() {

  const baseUrl = process.env.REACT_APP_BASE_URL;

  console.log(baseUrl);

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
