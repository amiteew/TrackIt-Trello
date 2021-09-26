import { BoardApp } from "./pages/BoardApp";
import { HomePage } from "./pages/HomePage";
import { CardDetails } from "./pages/CardDetails";
import { Login } from "./pages/Login";
import { UserBoards } from "./pages/UserBoards";

const routes = [
    {
        path: '/boards/:boardId',
        component: BoardApp,
    },
    {
        path: '/boards',
        component: UserBoards,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/',
        component: HomePage,
    },
    // {
    //     path: '/signup',
    //     component: Signup,
    // }
]

export default routes;