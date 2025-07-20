<template>
  <div class="max-w-2xl px-4 mx-auto flex flex-col gap-8 mt-6">
    <h1 class="text-2xl text-center">
      Stained Glass Art Creator
    </h1>
    <p>
      Create stained glass artworks by arranging colorful shapes in an intuitive online editor.
      Share your creations with the world, explore a vibrant gallery, and discover top-rated pieces.
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