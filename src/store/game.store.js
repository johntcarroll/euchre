import { defineStore } from "pinia";

const useGameStore = defineStore("game", {
  state: () => ({
    uuid: null,
    socket: null,
    lobbyGames: [],
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
      chatBufferOut: [],
    },
  }),
  actions: {
    async connect() {
      this.socket = new WebSocket(`${location.origin.replace(/^http/, 'ws')}/websocket`);
      this.socket.addEventListener("open", (event) => {
        //this.socket.send(`join ${this.uuid}`);
      });
      this.socket.addEventListener("message", (event) => {
        this.parse(event.data)
      });
      this.socket.addEventListener("error", (event) => {
      });
    },
    parse(data) {
      let [fn, ...params] = data.split(' ');
      console.debug("function:", fn, "params:", params);
      this[fn](...params);
    },
    say(speaker, ...words) {
      words = words.join(' ');
      console.debug("speaker:", speaker, "words:", words);
      this.game.chatBufferOut = this.game.chatBufferOut + [`${speaker}: ${words}\n`];
    },
    join(id) {
    },
    gameslist(game) {
      this.lobbyGames = this.lobbyGames.concat([game]);
    },
    refreshLobby() {
      this.lobbyGames = [];
      this.socket.send("gameslist");
    },
    error(...msg) {
      console.error(msg.join(' '));
    },
    flushChatBuffer() {
      let flush = this.game.chatBufferOut;
      this.game.chatBufferOut = [];
      return flush;
    },
    sendChat(input) {
      this.socket.send(`say ${input}`);
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
