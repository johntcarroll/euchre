import { defineStore } from "pinia";

const useLobbyStore = defineStore("lobby", {
  state: () => ({
    games: [],
    joinCallback: null,
    socket: null
  }),
  actions: {
    gameslist(game) {
      this.games = this.games.concat([game]);
    },
    attemptjoin(socket, id, callback) {
      socket.send(`join ${id}`);
      this.joinCallback = callback;
    },
    join(_id) {
      this.joinCallback();
    },
    parse(e) {
      let data = e.data;
      let [fn, ...params] = data.split(' ');
      console.debug("function:", fn, "params:", params);
      this[fn](...params);
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
    }
  }
});
export { useLobbyStore };
