<template>
  <div class="flex justify-center gap-6 py-6">
    <NuxtLink to="/" active-class="text-zinc-300">Gallery</NuxtLink>
    <NuxtLink to="/creator" active-class="text-zinc-300">Creator</NuxtLink>
    <template v-if="!user">
      <a href="/api/login">Login with GitHub</a>
    </template>
    <template v-else>
      <p>Hello {{ user.name }}</p>
      <button @click="clear">Logout</button>
    </template>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
</script>
