<template>
  <UModal
    title="Upload your art to the gallery"
    :close="{
      variant: 'outline',
      class: 'rounded-full text-zinc-900 border-zinc-900 bg-zinc-300'
    }"
    :ui="{
      content: 'bg-zinc-700 text-zinc-300 ring-zinc-500',
      title: 'text-zinc-300 border-zinc-900',
      header: 'border-zinc-500',
      overlay: 'bg-zinc-700/40'
    }"
  >
    <div class="mx-auto mt-5">
      <UTooltip text="Open upload panel">
        <UButton label="Upload panel" color="neutral" variant="subtle" class="bg-zinc-300"/>
      </UTooltip>
    </div>

    <template #body>
        <ArtDownload/>
        <USeparator class="my-3" :ui="{ border: 'border-zinc-500' }" />
        <p class="text-sm">You can link your GitHub account. It will display your avatar in the gallery under the art and allow others to visit your profile. </p>
        <USwitch v-model="isGithubLinked" :disabled="!loggedIn" label="Link your GitHub profile"
          class="my-3 text-sm" :ui="{ label: 'text-zinc-300' }"/>
        <UAlert
          v-if="!loggedIn"
          title="You need to log in to link your profile."
          variant="outline"
          class="bg-zinc-800 text-zinc-300 ring-zinc-700 px-4 md:px-6"
          :actions="[{
              onClick: openLoginPopup,
              icon: 'tabler:login-2',
              variant: 'ghost',
              size: 'xl', 
              color: 'neutral',
              class: 'text-zinc-400',
            }]"
          orientation="horizontal" />
        <USeparator class="my-3" :ui="{ border: 'border-zinc-500' }" />
        <ArtUpload class="mx-auto mt-3" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const isGithubLinked = ref(false)

function openLoginPopup() {
  openInPopup('/api/login')
}

const { loggedIn, openInPopup } = useUserSession()
</script>