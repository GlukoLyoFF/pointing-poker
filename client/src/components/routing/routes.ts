import { GamePage } from '../GamePage/GamePage';
import { Lobby } from '../LobbyPage/Lobby';
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
  {
    key: 'lobby',
    path: '/lobby',
    component: Lobby,
  },
  {
    key: 'game',
    path: '/game',
    component: GamePage,
  },
];
