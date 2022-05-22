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
      hands: {
        p1: [],
        p2: [],
        p3: [],
        p4: [],
      },
      kitty: [],
      dealer: null,
      seats: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
      },
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
    attemptjoin(socket) {
      socket.send(`join ${this.uuid}`);
    },
    attemptsit(socket, seat) {
      socket.send(`sit ${seat}`);
    },
    sit(player, seat) {
      this.game.seats[seat] = player;
    },
    stand(_player, seat) {
      this.game.seats[seat] = null;
    },
    attemptstand(socket) {
      socket.send('stand');
    },
    join(_id) {
      //join successful
      //this.router.push("game");
    },
    attemptleave(socket) {
      socket.send('leave');
    },
    leave() {
      this.$reset();
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
    cardinhand(playernumber, rank=null, suit=null) {
      this.game.hands[`p${playernumber}`].push({ rank, suit });
    },
    kitty(rank=null, suit=null) {
      this.game.kitty.push({ rank, suit });
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
