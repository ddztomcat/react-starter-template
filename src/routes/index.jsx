
import Loading from '@/components/loading';
import Loadable from 'react-loadable';
const LoadableHome = Loadable({
    loader: () => import('@/view/home/index'),
    loading: Loading,
});
const routes = [
    {
        path: '/',
        component: LoadableHome
    }
];
export default routes;
