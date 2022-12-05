import { Route, Routes } from "react-router-dom";
import Characters from "../pages/Characters";
import Character from "../pages/Character";
import Locations from "../pages/Locations";
import Location from "../pages/Location";
import Episodes from "../pages/Episodes";
import Episode from "../pages/Episode";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";



const routes = [
    {
        path: "",
        element: <Home />,
        exact: true
    },
    {
        path: "characters",
        element: <Characters />,
        exact: true
    },
    {
        path: "characters/:id",
        element: <Character />,
        exact: true
    },

    {
        path: "locations",
        element: <Locations />,
        exact: true
    },
    {
        path: "locations/:id",
        element: <Location />,
        exact: true
    },

    {
        path: "episodes",
        element: <Episodes />,
        exact: true
    },
    {
        path: "episodes/:id",
        element: <Episode />,
        exact: true
    },
    {
        path: "*",
        element: <NotFound />,
        exact: false
    },

];

const routesProvider = <Routes>{routes.map((route: any) => <Route key={route.path} element={route.element} path={route.path} />)}</Routes>

export default routesProvider;