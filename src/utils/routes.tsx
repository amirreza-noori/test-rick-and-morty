import { Route, Routes } from "react-router-dom";
import Characters from "../pages/Characters";
import Character from "../pages/Character";
import Locations from "../pages/Locations";


const routes = [
    {
        path: "characters",
        element: <Characters />
    },
    {
        path: "characters/:characterId",
        element: <Character />
    },

    {
        path: "locations",
        element: <Locations />
    },
];

const routesProvider = <Routes>{routes.map((route: any) => <Route key={route.path} element={route.element} path={route.path} />)}</Routes>

export default routesProvider;