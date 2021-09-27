import { GamePage } from 'pages/GamePage/GamePage';
import { Lobby } from 'pages/LobbyPage/Lobby';
import { Main } from '../pages/MainPage/Main';

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
    key: 'game',
    path: '/game',
    component: GamePage,
  },
  {
    key: 'lobby',
    path: '/lobby',
    component: Lobby,
  },
];
