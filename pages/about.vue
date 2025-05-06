<template>
  <div class="max-w-2xl px-4 mx-auto flex flex-col gap-8 mt-8">
    <h2 class="text-xl">
      Stained glass art creator
    </h2>
    <p>
      Create your own arts imitating stained glass windows.
      Log in to rate works created by others and together let's choose the best.
    </p>
    <p>
      This project was built using
      <UTooltip text="An approachable, performant and versatile framework for building web apps" :delay-duration="200">
        <span class="text-emerald-700">Vue.js</span>,
      </UTooltip>
      <UTooltip text="A full-stack framework built on top of Vue.js with great developer experience in mind" :delay-duration="200">
        <span class="text-emerald-700">Nuxt</span>
      </UTooltip>
      and deployed seamlessly with
      <UTooltip text="Cloudflare-powered platform that ensures lightning-fast performance with full-stack capabilities" :delay-duration="200">
        <span class="text-emerald-700">NuxtHub</span>.
      </UTooltip>
    </p>
    <UAlert
      title="Check out the source code!"
      variant="outline"
      icon="lucide:github"
      class="bg-zinc-800 text-zinc-300 ring-zinc-700 px-2 md:px-6"
      :actions="[{
          to: 'https://github.com/mkalino1/stained-glass',
          target: '_blank',
          icon: 'lucide:arrow-right',
          variant: 'ghost',
          size: 'xl',
          color: 'neutral',
          class: 'text-zinc-400'
        }]"
      orientation="horizontal"/>
    <FrequentlyAsked />
  </div>
</template>