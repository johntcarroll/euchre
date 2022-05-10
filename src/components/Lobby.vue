<script setup>
import { useGameStore } from "../store/game.store";
const gameStore = useGameStore();
gameStore.connect();
</script>

<template>
  <div class="row">
    <div class="col-12">
      <h6>Lobby</h6>
      <button @click="gameStore.refreshLobby">Refresh list</button>
      <ul>
	<li v-for="game in gameStore.lobbyGames">
	  {{game}}
	</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
