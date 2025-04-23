<template>
  <div>
    <UAlert
      title="Create your own art!"
      description="Unleash your creativity and create stained glass art in the creator tab."
      variant="outline"
      icon="lucide:brush"
      class="max-w-3xl mx-auto bg-zinc-800 text-zinc-300 ring-zinc-700 px-2 md:px-5 mt-4 mb-8"
      :ui="{ icon: '!size-6 m-2' }"
      :actions="[{
          to: '/creator',
          icon: 'lucide:arrow-right',
          variant: 'ghost',
          size: 'xl',
          color: 'neutral'
        }]"
      orientation="horizontal"
    />
    <ArtGallery />
  </div>
</template>
