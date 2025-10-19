
import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import BemolarPage from '../pages/bemorlar/page';
import TashxislarPage from '../pages/tashxislar/page';
import MuolajaPage from '../pages/muolaja/page';
import XonalarPage from '../pages/xonalar/page';
import HamshiralarPage from '../pages/hamshiralar/page';
import TahlillarPage from '../pages/tahlillar/page';
import NotFoundPage from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <BemolarPage />
      </Layout>
    ),
  },
  {
    path: '/bemorlar',
    element: (
      <Layout>
        <BemolarPage />
      </Layout>
    ),
  },
  {
    path: '/tashxislar',
    element: (
      <Layout>
        <TashxislarPage />
      </Layout>
    ),
  },
  {
    path: '/muolaja',
    element: (
      <Layout>
        <MuolajaPage />
      </Layout>
    ),
  },
  {
    path: '/xonalar',
    element: (
      <Layout>
        <XonalarPage />
      </Layout>
    ),
  },
  {
    path: '/hamshiralar',
    element: (
      <Layout>
        <HamshiralarPage />
      </Layout>
    ),
  },
  {
    path: '/tahlillar',
    element: (
      <Layout>
        <TahlillarPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
