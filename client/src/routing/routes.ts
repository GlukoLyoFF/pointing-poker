import { Lobby } from 'pages/LobbyPage/Lobby';
import { Main } from 'pages/MainPage/Main';
import { GamePage } from 'pages/GamePage/GamePage';
import { withAuth } from './withAuth';

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
  {
    key: 'lobby',
    path: '/lobby',
    component: withAuth(Lobby),
  },
  {
    key: 'game',
    path: '/game',
    component: withAuth(GamePage),
  },
];
