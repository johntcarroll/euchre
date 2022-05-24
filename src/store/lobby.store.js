import { defineStore } from "pinia";
import { useSocketStore } from "./socket.store";

const useLobbyStore = defineStore("lobby", {
  state: () => ({
    games: [],
    redirectToGame: null,
    socketStore: useSocketStore(),
  }),
  getters: {
    socket: (store) => store.socketStore.socket,
  },
  actions: {
    gameslist(game) {
      this.games.push(game);
    },
    join(id) {
      this.redirectToGame(id);
    },
    parse(e) {
      let data = e.data;
      let [fn, ...params] = data.split(' ');
      console.debug("function:", fn, "params:", params);
      (this[fn] || this.debug(fn))(...params);
    },
    debug(fn) {
      return function(...params) {
	console.debug("Dropping call to", fn, params, "from lobby store")
      };
    },
    refresh() {
      this.games = [];
      this.socket.send("gameslist");
    },
    create() {
      this.socket.send("create");
    }
  }
});
export { useLobbyStore };
