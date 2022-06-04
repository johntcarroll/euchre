import { defineStore } from "pinia";
import { useSocketStore } from "./socket.store";
import { useUserStore } from "./user.store";
import { useRouter } from 'vue-router';

const useGameStore = defineStore("game", {
  state: () => ({
    uuid: null,
    router: useRouter(),
    socketStore: useSocketStore(),
    userStore: useUserStore(),
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
      bidder: null,
      trumpSelector: null,
      seats: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
      },
    },
  }),
  getters: {
    socket: (store) => store.socketStore.socket,
    iAmBidder: (store) => {
      return store.game.seats[`p${store.game.bidder}`] == store.userStore.sessionId;
    },
    iAmTrumpSelector: (store) => {
      return store.game.seats[`p${store.game.trumpSelector}`] == store.userStore.sessionId;
    },
    availableTrumpSuits: (store) => ['hearts', 'diamonds', 'clubs', 'spades'].filter(suit => suit != store.game.deniedTrumpSuit)
  },
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
    allpass(suit) {
      this.game.deniedTrumpSuit = suit;
    },
    attemptsit(seat) {
      this.socket.send(`sit ${seat}`);
    },
    sit(player, seat) {
      this.game.seats[`p${seat}`] = player;
    },
    stand(_player, seat) {
      this.game.seats[`p${seat}`] = null;
    },
    attemptstand() {
      this.socket.send('stand');
    },
    attemptjoin() {
      this.socket.send(`join ${this.uuid}`);
    },
    attemptleave() {
      this.socket.send('leave');
    },
    leave() {
      this.router.push('/lobby');
    },
    error(...msg) {
      console.error(msg.join(' '));
    },
    attemptplay(rank, suit) {
      this.socket.send(`play ${rank} ${suit}`);
    },
    attemptbid(yorn) {
      this.socket.send(`bid ${yorn}`);
    },
    bidder(seat=null) {
      this.game.bidder = seat;
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
    trump(suit) {
      this.game.trumpSuit = suit;
    },
    trumpselector(seat=null) {
      this.game.trumpSelector = seat;
    }
  },
});
export { useGameStore };
