import "./App.css";
import * as ROUTES from "./constants/index";
import { ProtectedRoutes } from "./components";
import {
  Home,
  Login,
  Overview,
  Stats,
  Projects,
  Chat,
  Calendar,
  Settings,
} from "./pages";
import { UserContextProvider } from "./context/UserContext";
import { Routes, Route, Navigate } from "react-router-dom";
import { TodoContextProvider } from "./context/TodoContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={ROUTES.HOME} element={<ProtectedRoutes />}>
          <Route path={ROUTES.HOME} element={<Home />}>
            <Route
              path={ROUTES.HOME}
              element={<Navigate replace to={ROUTES.PROJECTS} />}
            />
            <Route path={ROUTES.OVERVIEW} element={<Overview />} />
            <Route path={ROUTES.STATS} element={<Stats />} />
            <Route
              path={ROUTES.PROJECTS}
              element={
                <TodoContextProvider>
                  <Projects />
                </TodoContextProvider>
              }
            />
            <Route path={ROUTES.CHAT} element={<Chat />} />
            <Route path={ROUTES.CALENDAR} element={<Calendar />} />
            <Route path={ROUTES.SETTING} element={<Settings />} />
          </Route>
        </Route>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
