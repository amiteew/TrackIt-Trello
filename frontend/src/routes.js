import { BoardApp } from "./pages/BoardApp";
import { HomePage } from "./pages/HomePage";
// import { CardDetails } from "./pages/CardDetails";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { TemplateBoards } from "./pages/TemplateBoards";
import { UserBoards } from "./pages/UserBoards";
import { CardNotFound } from "./pages/CardNotFound";

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
        path: '/cardNotFound',
        component: CardNotFound,
    },
    {
        path: '/templates',
        component: TemplateBoards,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: Signup,
    },
    {
        path: '/',
        component: HomePage,
    }
]

export default routes;