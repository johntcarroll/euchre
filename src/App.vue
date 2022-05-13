<script setup>
import "./style/cards.css";
import { useSocketStore } from "./store/socket.store";
const socketStore = useSocketStore();
socketStore.connect();
</script>

<template>
  <router-view />
</template>
