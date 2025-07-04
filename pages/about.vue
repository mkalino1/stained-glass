<template>
  <div class="max-w-2xl px-4 mx-auto flex flex-col gap-8 mt-6">
    <h1 class="text-2xl text-center">
      Stained glass art creator
    </h1>
    <p>
      Create your own stained glass like arts.
      Log in to rate works created by others and together let's choose the best of them.
    </p>
    <p>
      This project was built using
      <UTooltip text="An approachable, performant and versatile framework for building web apps" :delay-duration="200">
        <span class="text-emerald-700">Vue.js</span>,
      </UTooltip>
      <UTooltip text="A full-stack framework built on top of Vue.js with great developer experience in mind" :delay-duration="200">
        <span class="text-emerald-700">Nuxt</span>
      </UTooltip>
      and deployed with
      <UTooltip text="Cloudflare-powered platform that ensures lightning-fast performance with full-stack capabilities" :delay-duration="200">
        <span class="text-emerald-700">NuxtHub</span>.
      </UTooltip>
    </p>
    <UAlert
      title="Check out the source code!"
      variant="soft"
      icon="lucide:github"
      class="px-2 md:px-6"
      :actions="[{
          to: 'https://github.com/mkalino1/stained-glass',
          target: '_blank',
          icon: 'lucide:arrow-right',
          variant: 'ghost',
          size: 'xl',
        }]"
      orientation="horizontal"/>
    <FrequentlyAsked />
  </div>
</template>