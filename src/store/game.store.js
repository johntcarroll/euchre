import { defineStore } from "pinia";

const useGameStore = defineStore("game", {
  state: () => ({
    uuid: null,
    socket: null,
    game: {
      activeCards: {
        self: null,
        left: null,
        partner: {
	  suit: "spades",
	  rank: "10",
	},
        right: null,
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
    attemptplay(socket, rank, suit) {
      socket.send(`play ${rank} ${suit}`);
    },
    play(player, rank, suit) {
      this.game.activeCards[player] = { rank, suit };
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
