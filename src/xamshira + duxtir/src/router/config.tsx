
import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import BemolarPage from '../pages/bemorlar/page';
import TashxislarPage from '../pages/tashxislar/page';
import MuolajaPage from '../pages/muolaja/page';
import XonalarPage from '../pages/xonalar/page';
import HamshiralarPage from '../pages/hamshiralar/page';
import TahlillarPage from '../pages/tahlillar/page';
import NotFoundPage from '../pages/NotFound';

// Hamshira panel sahifalari
import HamshiraDashboard from '../pages/hamshira-dashboard/page';
import HamshiraBemorlar from '../pages/hamshira-bemorlar/page';
import HamshiraMuolajalar from '../pages/hamshira-muolajalar/page';
import HamshiraVitals from '../pages/hamshira-vitals/page';
import HamshiraTahlillar from '../pages/hamshira-tahlillar/page';
import HamshiraXonalar from '../pages/hamshira-xonalar/page';
import HamshiraBildirishnomalar from '../pages/hamshira-bildirishnomalar/page';
import HamshiraProfil from '../pages/hamshira-profil/page';

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

  // Hamshira panel yo'nalishlari
  {
    path: '/hamshira-dashboard',
    element: <Layout><HamshiraDashboard /></Layout>
  },
  {
    path: '/hamshira-bemorlar',
    element: <Layout><HamshiraBemorlar /></Layout>
  },
  {
    path: '/hamshira-muolajalar',
    element: <Layout><HamshiraMuolajalar /></Layout>
  },
  {
    path: '/hamshira-vitals',
    element: <Layout><HamshiraVitals /></Layout>
  },
  {
    path: '/hamshira-tahlillar',
    element: <Layout><HamshiraTahlillar /></Layout>
  },
  {
    path: '/hamshira-xonalar',
    element: <Layout><HamshiraXonalar /></Layout>
  },
  {
    path: '/hamshira-bildirishnomalar',
    element: <Layout><HamshiraBildirishnomalar /></Layout>
  },
  {
    path: '/hamshira-profil',
    element: <Layout><HamshiraProfil /></Layout>
  }
];

export default routes;
