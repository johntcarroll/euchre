import { defineStore } from "pinia";

const useGameStore = defineStore("game", {
  state: () => ({
    uuid: null,
    socket: null,
    game: {
      activeCards: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
      },
      trickCounts: {
        us: 0,
        them: 0,
      },
      gameScore: {
        us: 0,
        them: 0,
      },
      actionOn: null,
      trumpSuit: null,
      actions: [],
      hand: [],
      topKitty: null,
      dealer: null,
    },
  }),
  actions: {
    async connect() {
      try {
        state.socket = new WebSocket();
        state.socket.addEventListener("open", (event) => {
          this.tick(event.data);
        });
        state.socket.addEventListener("message", (event) => {
          this.tick(event.data);
        });
        state.socket.addEventListener("error", (event) => {
          this.connect();
        });
      } catch (e) {
        throw e;
      }
    },
    tick(gameState) {
      state.game = gameState;
    },
    act(type, option) {
      try {
        let validAction = state.game.actions.find(
          (action) => action.type == type
        );
        if (!validAction || !validAction.options.includes(option))
          throw "Invalid Action!";

        state.socket.send(`${type} ${option}`);
      } catch (e) {
        throw e;
      }
    },
  },
});
export { useGameStore };
