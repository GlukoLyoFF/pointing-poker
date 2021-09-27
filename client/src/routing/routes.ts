<<<<<<< HEAD
import { GamePage } from 'pages/GamePage/GamePage';
import { Lobby } from 'pages/LobbyPage/Lobby';
import { Main } from '../pages/MainPage/Main';
=======
import { Lobby } from 'pages/LobbyPage/Lobby';
import { Main } from 'pages/MainPage/Main';
import { GamePage } from 'pages/GamePage/GamePage';
import { withAuth } from './withAuth';
>>>>>>> 3dafdb5a3deffccb09d0ab45e55b74bac6d4253a

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
<<<<<<< HEAD
    key: 'game',
    path: '/game',
    component: GamePage,
  },
  {
    key: 'lobby',
    path: '/lobby',
    component: Lobby,
=======
    key: 'lobby',
    path: '/lobby',
    component: withAuth(Lobby),
  },
  {
    key: 'game',
    path: '/game',
    component: withAuth(GamePage),
>>>>>>> 3dafdb5a3deffccb09d0ab45e55b74bac6d4253a
  },
];
