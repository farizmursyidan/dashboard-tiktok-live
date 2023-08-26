import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard.js"));
const User = React.lazy(() => import("./views/User.js"));
const Aktivitas = React.lazy(() => import("./views/Aktivitas.js"));
const Live = React.lazy(() => import("./views/Live.js"));

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ft-home",
    component: <Dashboard />,
  },
  {
    path: "/user",
    name: "User",
    icon: "ft-user",
    component: <User />,
  },
  {
    path: "/aktivitas",
    name: "Aktivitas",
    icon: "ft-bar-chart",
    component: <Aktivitas />,
  },
  {
    path: "/live",
    name: "Live",
    icon: "ft-tv",
    component: <Live />,
  },
];

export default routes;