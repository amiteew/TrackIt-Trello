import { BoardApp } from "./pages/BoardApp";
import { HomePage } from "./pages/HomePage";

const routes = [
    {
        path: '/b',
        component: BoardApp,
    },
    {
        path: '/',
        component: HomePage,
    }

]

export default routes;