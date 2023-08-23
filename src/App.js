import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes.js";

const Login = React.lazy(() => import("./views/Login"));
const Sidebar = React.lazy(() => import('./views/Sidebar'));

function App() {
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          key={key}
          exact
          path={prop.path}
          name={prop.name}
          element={<><Sidebar />{prop.component}</>}
        />
      );
    });
  };
  return (
    <>
      <Routes>
        <Route exact path="/" name="Home" element={<Login />} />
        {getRoutes(routes)}
      </Routes>
    </>
  )
}

export default App;
