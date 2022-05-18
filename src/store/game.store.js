import { defineStore } from "pinia";

const useGameStore = defineStore(
  "game",
  {
    state: () => ({
      uuid: null,
      socket: null,
      game: {
        activeCards: {
          self: {
            suit: "clubs",
            rank: "9",
          },
          left: {
            suit: "spades",
            rank: "10",
          },
          partner: {
            suit: "hearts",
            rank: "A",
          },
          right: {
            suit: "diams",
            rank: "3",
          },
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
        let [fn, ...params] = data.split(" ");
        console.debug("function:", fn, "params:", params);
        (this[fn] || this.debug(fn))(...params);
      },
      debug(fn) {
        return function (...params) {
          console.debug("Dropping call to", fn, params, "from game store");
        };
      },
      attemptjoin(socket) {
        socket.send(`join ${this.uuid}`);
      },
      attemptsit(socket, seat) {
        socket.send(`sit ${seat}`);
      },
      attemptstand(socket) {
        socket.send("stand");
      },
      join(_id) {
        //join successful
        //this.router.push("game");
      },
      attemptleave(socket) {
        socket.send("leave");
      },
      leave(socket) {
        //socket.send('leave');
      },
      error(...msg) {
        console.error(msg.join(" "));
      },
      attemptplay(socket, rank, suit) {
        socket.send(`play ${rank} ${suit}`);
      },
      play(player, rank, suit) {
        this.game.activeCards[player] = { rank, suit };
      },
      cardinhand(player, rank = null, suit = null) {
        this.hand.push({ rank, suit });
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
  },
  { socketed: true, socketPrefix: "game" }
);
export { useGameStore };
