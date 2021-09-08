import { Main } from '../MainPage/main';

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
