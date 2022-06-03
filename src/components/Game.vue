<script setup>
import { onMounted, onUnmounted } from "vue";
import { useGameStore } from "../store/game.store";
import { useSocketStore } from "../store/socket.store";
import { useUserStore } from "../store/user.store";
import { useRoute } from "vue-router";
import Hand from "./cards/Hand.vue";
import Card from "./cards/Card.vue";
import Chat from "./Chat.vue";
const route = useRoute();
const gameStore = useGameStore();
const socketStore = useSocketStore();
const userStore = useUserStore();
onMounted(() => {
  if (route.params.uuid) gameStore.uuid = route.params.uuid;
  socketStore.listen("message", gameStore.parse);
  gameStore.attemptjoin();
});
onUnmounted(() => {
  gameStore.attemptleave();
  socketStore.unlisten("message", gameStore.parse);
  gameStore.$reset();
});
</script>
<template>
  <button @click="gameStore.attemptsit(1)">Sit at seat 1</button>
  <button @click="gameStore.attemptsit(2)">Sit at seat 2</button>
  <button @click="gameStore.attemptsit(3)">Sit at seat 3</button>
  <button @click="gameStore.attemptsit(4)">Sit at seat 4</button>
  <button @click="gameStore.attemptstand()">Stand up</button>

  <button v-if="gameStore.iAmBidder"
	  @click="gameStore.attemptbid('yes')">Pick-it-up</button>
  <button v-if="gameStore.iAmBidder"
	  @click="gameStore.attemptbid('no')">Pass</button>
  <div id="Game" class="row">
    <div class="game-board col-xl-8">
      <div class="hand-container p3">
        <Hand handType="card-table">
          <Card v-for="{rank, suit} in gameStore.game.hands.p3" :rank="rank" :suit="suit" :playable="gameStore.game.seat == 3" />
        </Hand>
      </div>
      <div class="player-name p3">
        Player {{userStore.nameFromId(gameStore.game.seats.p3)}}
      </div>
      <div class="active-card p3">
        <Hand handType="card-table">
          <Card v-if="gameStore.game.activeCards.p3" :rank="gameStore.game.activeCards.p3.rank" :suit="gameStore.game.activeCards.p3.suit" />
        </Hand>
      </div>
      <div class="hand-container p2">
        <Hand handType="card-table">
          <Card v-for="{rank, suit} in gameStore.game.hands.p2" :rank="rank" :suit="suit" :playable="gameStore.game.seat == 2"/>
        </Hand>
      </div>
      <div class="player-name p2">
        Player {{userStore.nameFromId(gameStore.game.seats.p2)}}
      </div>
      <div class="active-card p2">
        <Hand handType="card-table">
          <Card v-if="gameStore.game.activeCards.p2" :rank="gameStore.game.activeCards.p2.rank" :suit="gameStore.game.activeCards.p2.suit" />
        </Hand>
      </div>
      <div class="hand-container p4">
        <Hand handType="card-table">
          <Card v-for="{rank, suit} in gameStore.game.hands.p4" :rank="rank" :suit="suit" :playable="gameStore.game.seat == 4"/>
        </Hand>
      </div>
      <div class="player-name p4">
        Player {{userStore.nameFromId(gameStore.game.seats.p4)}}
      </div>
      <div class="active-card p4">
        <Hand handType="card-table">
          <Card v-if="gameStore.game.activeCards.p4" :rank="gameStore.game.activeCards.p4.rank" :suit="gameStore.game.activeCards.p4.suit" />
        </Hand>
      </div>
      <div class="hand-container p1">
        <Hand handType="card-table">
          <Card v-for="{rank, suit} in gameStore.game.hands.p1" :rank="rank" :suit="suit" :playable="gameStore.game.seat == 1"/>
        </Hand>
      </div>
      <div class="player-name p1">
        Player {{userStore.nameFromId(gameStore.game.seats.p1)}}
      </div>
      <div class="active-card p1">
        <Hand handType="card-table">
          <Card v-if="gameStore.game.activeCards.p1" :rank="gameStore.game.activeCards.p1.rank" :suit="gameStore.game.activeCards.p1.suit" />
        </Hand>
      </div>
      <div class="kitty">
        <Hand handType="deck">
          <Card v-for="{rank, suit} in gameStore.game.kitty" :rank="rank" :suit="suit" />
        </Hand>
      </div>
      <div class="hand-stats">
        <div>Hand Stats</div>
        <div>Trump: {{gameStore.game.trumpSuit}}</div>
        <div>Our Tricks: 0</div>
        <div>Thier Tricks: 0</div>
        <div>Role: Maker</div>
      </div>
      <div class="game-stats">
        <div>Game Stats</div>
        <div>Our Points: 0</div>
        <div>Their Points: 0</div>
      </div>
    </div>
    <div id="Debug" class="col-xl-4">
      <Chat />
      <pre>{{ JSON.stringify(gameStore, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  position: relative;
  background-color: #216c41;
  height: 800px;
}

.player-name {
  color: white;
}

.hand-container,
.active-card,
.player-name {
  position: absolute;
}

.player-name.p1 {
  bottom: 0;
  left: 350px;
}

.hand-container.p1 {
  bottom: 10px;
  left: 200px;
}

.active-card.p1 {
  bottom: 150px;
  left: 350px;
}

.player-name.p3 {
  top: 0px;
  left: 350px;
}

.hand-container.p3 {
  top: 0px;
  left: 200px;
}

.active-card.p3 {
  top: 130px;
  left: 350px;
}

.player-name.p2 {
  top: 325px;
  left: -45px;
  transform: rotate(90deg);
}

.hand-container.p2 {
  top: 325px;
  left: -115px;
  transform: rotate(90deg);
}

.active-card.p2 {
  top: 325px;
  left: 155px;
  transform: rotate(90deg);
}

.player-name.p4 {
  top: 325px;
  right: -45px;
  transform: rotate(270deg);
}

.hand-container.p4 {
  top: 325px;
  right: -125px;
  transform: rotate(270deg);
}

.active-card.p4 {
  top: 325px;
  right: 155px;
  transform: rotate(270deg);
}

.kitty {
  position: absolute;
  top: 325px;
  right: 450px;
}

.hand-stats {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  color: black;
}

.game-stats {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  color: black;
}
</style>
