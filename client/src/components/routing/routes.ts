import { Main } from '../MainPage/Main';

interface RoutesScheme {
  key: string;
  path: string;
  component: React.FC;
}

export const Routes: RoutesScheme[] = [
  {
    key: 'main',
    path: '/',
    component: Main,
  },
];
