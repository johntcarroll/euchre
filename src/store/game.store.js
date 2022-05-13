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
    join(id) {
      this.router.push("game");
    },
    error(...msg) {
      console.error(msg.join(' '));
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
