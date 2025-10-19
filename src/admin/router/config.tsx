
import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import DashboardPage from '../pages/dashboard/page';
import ShifokorlarPage from '../pages/shifokorlar/page';
import BemolarPage from '../pages/bemorlar/page';
import HamshiralarPage from '../pages/hamshiralar/page';
import XonalarPage from '../pages/xonalar/page';
import TahlillarPage from '../pages/tahlillar/page';
import HisobotlarPage from '../pages/hisobotlar/page';
import SozlamalarPage from '../pages/sozlamalar/page';
import NotFoundPage from '../pages/NotFound';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <Layout>
        <DashboardPage />
      </Layout>
    ),
  },
  {
    path: '/shifokorlar',
    element: (
      <Layout>
        <ShifokorlarPage />
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
    path: '/hamshiralar',
    element: (
      <Layout>
        <HamshiralarPage />
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
    path: '/tahlillar',
    element: (
      <Layout>
        <TahlillarPage />
      </Layout>
    ),
  },
  {
    path: '/hisobotlar',
    element: (
      <Layout>
        <HisobotlarPage />
      </Layout>
    ),
  },
  {
    path: '/sozlamalar',
    element: (
      <Layout>
        <SozlamalarPage />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
