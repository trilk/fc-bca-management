import React from "react";

const Home = React.lazy(() => import("./views/pages/Home"));
const EventSummary = React.lazy(() => import("./views/events/EventSummary"));

const routes = [
  { path: "/", exact: true, name: 'Home', component: Home },
  { path: "/events/:id", exact: true, name: 'EventSummary', component: EventSummary },
  // { path: "/dashboard", name: i18n.t('top-menu.br-dashboard'), component: Dashboard },
];

export default routes;
