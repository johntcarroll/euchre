import { defineStore } from "pinia";

const useLobbyStore = defineStore("lobby", {
  state: () => ({
    games: [],
    redirectToGame: null,
    socket: null
  }),
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
	console.debug("Dropping call to", fn, params, "from game store")
      };
    },
    refresh(socket) {
      this.games = [];
      socket.send("gameslist");
    },
    create(socket) {
      socket.send("create");
    }
  }
});
export { useLobbyStore };
