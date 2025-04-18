<template>
  <div class="font-mono text-zinc-400 max-w-4xl mx-auto">
    <NuxtRouteAnnouncer />
    <NavBar />
    <NuxtPage class="pb-20"/>
    <Toaster theme="dark" :toast-options="{
      classes: {
        toast: 'font-mono bg-zinc-800 text-zinc-400 rounded-md',
        actionButton: '!bg-zinc-500',
      }
    }" />
  </div>
</template>

<style>
body {
  @apply bg-zinc-900
}
</style>