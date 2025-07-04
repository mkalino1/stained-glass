<template>
  <div class="px-4 pt-2">
    <p class="text-sm">Optionally you can link your GitHub account. It will display your avatar in the gallery under the art and allow others to visit your profile. </p>
    <USwitch v-model="isGithubLinked" :disabled="!loggedIn" label="Link your GitHub profile"
      class="my-3 text-sm" />
    <UAlert
      v-if="!loggedIn"
      title="You need to log in to link your profile."
      description="Your progress won't be lost."
      variant="soft"
      class="px-4 md:px-6"
      :actions="[{
          onClick: openLoginPopup,
          icon: 'tabler:login-2',
          variant: 'ghost',
          size: 'xl', 
        }]"
      orientation="horizontal"
      :ui="{ description: 'text-xs' }" />
  </div>
</template>

<script setup lang="ts">
const { loggedIn, openInPopup } = useUserSession()
const isGithubLinked = ref(false)

function openLoginPopup() {
  openInPopup('/api/login')
}
</script>