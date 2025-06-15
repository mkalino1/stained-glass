<template>
  <p class="text-sm">You can optionally link your GitHub account. It will display your avatar in the gallery under the art and allow others to visit your profile. </p>
  <USwitch v-model="isGithubLinked" :disabled="!loggedIn" label="Link your GitHub profile"
    class="my-3 text-sm" :ui="{ label: 'text-zinc-300' }"/>
  <UAlert
    v-if="!loggedIn"
    title="You need to log in to link your profile."
    description="Your progress won't be lost."
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
    orientation="horizontal"
    :ui="{ description: 'text-xs' }" />
</template>

<script setup lang="ts">
const isGithubLinked = ref(false)

function openLoginPopup() {
  openInPopup('/api/login')
}

const { loggedIn, openInPopup } = useUserSession()
</script>