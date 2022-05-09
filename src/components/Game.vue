<script setup>
import { useGameStore } from "../store/game.store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Hand from "./cards/Hand.vue";
import Card from "./cards/Card.vue";
import Chat from "./Chat.vue";
const gameStore = useGameStore();
const route = useRoute();

onMounted(() => {
  if (route.params.uuid) gameStore.uuid = route.params.uuid;
  gameStore.connect();
});
</script>
<template>
  <div id="Game">
    <div class="row">
      <div class="col-12">
        <h6>{{ JSON.stringify(gameStore, null, 2) }}</h6>
      </div>
    </div>
    <Chat />
    <div class="game-board">
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
          <Card rank="9" suit="hearts" />
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
          <Card rank="9" suit="hearts" />
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
          <Card rank="9" suit="hearts" />
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
          <Card rank="9" suit="hearts" />
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
  </div>
</template>

<style scoped>
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
