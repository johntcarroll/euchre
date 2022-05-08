<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
<template>
  <div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem">
    <router-link
      :to="{ name: 'lobby' }"
      class="d-block p-3 link-dark text-decoration-none text-center"
    >
      <i class="bi-suit-spade-fill"></i>
    </router-link>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
      <li class="nav-item">
        <router-link
          :to="{ name: 'lobby' }"
          class="nav-link py-3 border-bottom"
          :class="{ active: route.name == 'lobby' }"
        >
          <i class="fa-solid fa-khanda"></i>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'game', params: { uuid: 'TESTUUID' } }"
          class="nav-link py-3 border-bottom"
          :class="{ active: route.name == 'game' }"
          :disabled="true"
        >
          <i class="fa-solid fa-flag-checkered"></i>
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'user' }"
          class="nav-link py-3"
          :class="{ active: route.name == 'user' }"
        >
          <i class="fa-solid fa-user"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>
