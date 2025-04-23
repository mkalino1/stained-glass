<template>
  <div>
    <UAlert
      title="Create your own art!"
      description="Unleash your creativity and create stained glass art in the creator tab."
      variant="outline"
      icon="lucide:brush"
      class="bg-zinc-800 text-zinc-300 ring-zinc-700 px-6 py-5 mt-4 mb-8"
      :ui="{ icon: '!size-6 m-2', title: 'text-base' }"
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
