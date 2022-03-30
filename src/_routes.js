import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Home = React.lazy(() => import("./views/pages/Home"));
const TodayBetting = React.lazy(() => import("./views/events/TodayBetting"));
const EventSummary = React.lazy(() => import("./views/events/EventSummary"));
const UserBetHistory = React.lazy(() => import("./views/events/UserBetHistory"));

const routes = [
  { path: "/", exact: true, name: 'Home', component: Home },
  { path: "/events/today", exact: true, name: 'TodayBetting', component: TodayBetting },
  { path: "/events/:id", exact: true, name: 'EventSummary', component: EventSummary },
  { path: "/event-user/:id", exact: true, name: 'UserBetHistory', component: UserBetHistory },
  { path: "/dashboard", exact: true, name: 'UserDashboard', component: Dashboard },
];

export default routes;
