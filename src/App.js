
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './component/Login';


function App() {

  return(
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='dashboard' element={<Dashboard/>}></Route>
    </Routes>
  )
}

export default App;
