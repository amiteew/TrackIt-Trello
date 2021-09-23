import { BoardApp } from "./pages/BoardApp";
import { HomePage } from "./pages/HomePage";
import { CardDetails } from "./pages/CardDetails";

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
    }

]

export default routes;