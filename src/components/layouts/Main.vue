<script setup>
import Sidebar from "../nav/Sidebar.vue";
import { useSocketStore } from "../../store/socket.store";
const socketStore = useSocketStore();
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <Sidebar />
      </div>
      <div class="col-11">
        <div v-if="!socketStore.connected" class="lds-dual-ring">
	  Connecting...
        </div>
        <router-view v-if="socketStore.connected" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #333 transparent #D2042D transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
