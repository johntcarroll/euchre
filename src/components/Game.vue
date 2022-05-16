<script setup>
import { onMounted, onUnmounted } from "vue";
import { useGameStore } from "../store/game.store";
import { useSocketStore } from "../store/socket.store";
import { useRoute } from "vue-router";
import Hand from "./cards/Hand.vue";
import Card from "./cards/Card.vue";
import Chat from "./Chat.vue";
const route = useRoute();
const gameStore = useGameStore();
const socketStore = useSocketStore();
onMounted(() => {
  if (route.params.uuid) gameStore.uuid = route.params.uuid;
  socketStore.listen("message", gameStore.parse);
  gameStore.attemptjoin(socketStore.socket);
});
onUnmounted(() => {
  gameStore.attemptleave(socketStore.socket);
  socketStore.unlisten("message", gameStore.parse);
});
</script>
<template>
  <div id="Game" class="row">
    <div class="game-board col-8">
      <div class="hand-container partner">
        <Hand handType="card-table">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Hand>
      </div>
      <div class="active-card partner">
        <Hand handType="card-table">
          <Card :rank="gameStore.game.activeCards.partner.rank" :suit="gameStore.game.activeCards.partner.suit" />
        </Hand>
      </div>
      <div class="hand-container opponent-left">
        <Hand handType="card-table">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Hand>
      </div>
      <div class="active-card opponent-left">
        <Hand handType="card-table">
          <Card :rank="gameStore.game.activeCards.left.rank" :suit="gameStore.game.activeCards.left.suit" />
        </Hand>
      </div>
      <div class="hand-container opponent-right">
        <Hand handType="card-table">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Hand>
      </div>
      <div class="active-card opponent-right">
        <Hand handType="card-table">
          <Card :rank="gameStore.game.activeCards.right.rank" :suit="gameStore.game.activeCards.right.suit" />
        </Hand>
      </div>
      <div class="hand-container self">
        <Hand handType="card-table">
          <Card rank="9" suit="hearts" playable />
          <Card rank="a" suit="spades" playable />
          <Card rank="k" suit="diams" playable />
          <Card rank="q" suit="clubs" playable />
          <Card rank="j" suit="clubs" playable />
        </Hand>
      </div>
      <div class="active-card self">
        <Hand handType="card-table">
          <Card :rank="gameStore.game.activeCards.self.rank" :suit="gameStore.game.activeCards.self.suit" />
        </Hand>
      </div>
      <div class="kitty">
        <Hand handType="deck">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card rank="9" suit="hearts" />
        </Hand>
      </div>
      <div class="hand-stats">
        <div>Hand Stats</div>
        <div>Trump: TBD</div>
        <div>Our Tricks: 0</div>
        <div>Thier Tricks: 0</div>
        <div>Role: Maker</div>
      </div>
      <div class="game-stats">
        <div>Game Stats</div>
        <div>Our Points: 0</div>
        <div>Thier Points: 0</div>
      </div>
    </div>
    <div id="Debug" class="col-4">
      <pre>{{ JSON.stringify(gameStore, null, 2) }}</pre>
      <Chat />
    </div>
  </div>
</template>

<style scoped>
#Debug {
float: right;
}
.game-board {
  position: relative;
  background-color: #216c41;
  height: 800px;
  width: 800px;
}

.hand-container,
.active-card {
  position: absolute;
}

.hand-container.self {
  bottom: 0;
  left: 200px;
}

.active-card.self {
  bottom: 150px;
  left: 350px;
}

.hand-container.partner {
  top: -20px;
  left: 200px;
}

.active-card.partner {
  top: 130px;
  left: 350px;
}

.hand-container.opponent-left {
  top: 325px;
  left: -145px;
  transform: rotate(90deg);
}

.active-card.opponent-left {
  top: 325px;
  left: 155px;
  transform: rotate(90deg);
}

.hand-container.opponent-right {
  top: 325px;
  right: -145px;
  transform: rotate(90deg);
}

.active-card.opponent-right {
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
