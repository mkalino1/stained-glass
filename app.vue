<template>
  <UApp>
    <div class="text-zinc-400 max-w-4xl mx-auto">
      <NuxtRouteAnnouncer />
      <NavBar />
      <NuxtPage class="pb-20 px-1"/>
      <Toaster theme="dark" :toast-options="{
        classes: {
          toast: 'font-mono !bg-zinc-800 text-zinc-400 rounded-md',
          actionButton: '!bg-zinc-500',
        }
      }" />
    </div>
  </UApp>
</template>

<style>
body {
  background-color: var(--color-zinc-900);
}
</style>