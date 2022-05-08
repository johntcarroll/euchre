<script setup>
import config from "../../config";
const props = defineProps({
  handType: {
    type: String,
    required: false,
    default: "card-table",
    validator: (value) => config.cards.handTypes.includes(value),
  },
});
</script>
<template>
  <div class="playingCards fourColours simpleCards">
    <ul :class="{ [props.handType]: true }">
      <slot></slot>
    </ul>
  </div>
</template>
