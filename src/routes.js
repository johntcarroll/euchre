import Lobby from "./components/Lobby.vue";
import Main from "./components/layouts/Main.vue";
import Game from "./components/Game.vue";
import User from "./components/User.vue";
export default [
  {
    name: "main",
    component: Main,
    path: "",
    children: [
      {
        name: "lobby",
        component: Lobby,
        path: "lobby",
      },
      {
        name: "game",
        component: Game,
        path: "play/:uuid?",
      },
      {
        name: "user",
        component: User,
        path: "me",
      },
    ],
  },
];
