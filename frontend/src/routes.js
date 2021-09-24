import { BoardApp } from "./pages/BoardApp";
import { HomePage } from "./pages/HomePage";
import { CardDetails } from "./pages/CardDetails";
import { Login } from "./pages/Login";

const routes = [
    {
        path: '/b/cardDetails/:cardId/',
        component: CardDetails,
    },
    {
        path: '/b',
        component: BoardApp,
    },
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/login',
        component: Login,
    },
    // {
    //     path: '/signup',
    //     component: Signup,
    // }
]

export default routes;