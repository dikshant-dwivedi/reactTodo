import './App.css';
import * as ROUTES from "./constants/index"
import {Home, Login} from './pages';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default App;
