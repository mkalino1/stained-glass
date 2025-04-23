<template>
  <div class="flex justify-center gap-6 py-6 text-lg">
    <NuxtLink to="/" active-class="text-zinc-200">Gallery</NuxtLink>
    <NuxtLink to="/creator" active-class="text-zinc-200">Creator</NuxtLink>
    <NuxtLink to="/about" active-class="text-zinc-200">About</NuxtLink>
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
