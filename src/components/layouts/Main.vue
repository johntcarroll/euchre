<script setup>
import Sidebar from "../nav/Sidebar.vue";
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <Sidebar />
      </div>
      <div class="col-11">
        <router-view />
      </div>
    </div>
  </div>
</template>
