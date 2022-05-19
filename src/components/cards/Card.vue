<script setup>
import { useGameStore } from "../../store/game.store";
import { useSocketStore } from "../../store/socket.store";
import config from "../../config";
import { computed } from "@vue/reactivity";

const gameStore = useGameStore();
const socketStore = useSocketStore();
const props = defineProps({
  rank: {
    type: String,
    required: false,
    default: null,
    validator: (value) =>
      config.cards.cardRanks.includes(value) || value === null,
  },
  suit: {
    type: String,
    required: false,
    default: null,
    validator: (value) =>
      config.cards.cardSuits.includes(value) || value === null,
  },
  playable: {
    type: Boolean,
    default: false,
  },
});

const cardClass = computed(() => ({
  "playing-card": true,
  back: !props.rank && !props.suit,
  [`rank-${props.rank}`]: Boolean(props.rank),
  [props.suit]: Boolean(props.suit),
}));

const unicodeSuit = computed(() => `&${props.suit};`);
function play() {
  gameStore.attemptplay(socketStore.socket, props.rank, props.suit);
}
</script>
<template>
  <li>
    <component :is="playable ? 'a' : 'div'" :class="cardClass" @click="play">
      <span class="rank" v-if="props.rank">{{ props.rank }}</span>
      <span class="suit" v-if="props.suit" v-html="unicodeSuit"></span>
    </component>
  </li>
</template>

<style scoped>
a.playing-card:hover {
  cursor: pointer;
}
</style>
