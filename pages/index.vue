<template>
  <div>
    <div class="mx-3">
      <UAlert
        title="Create your own art!"
        description="Unleash your creativity and create stained glass arts in the creator tab."
        variant="soft"
        icon="lucide:brush"
        class="max-w-3xl mx-auto px-2 md:px-5 mt-4 mb-8"
        :ui="{ icon: '!size-6 m-2' }"
        :actions="[{
            to: '/creator',
            icon: 'lucide:arrow-right',
            variant: 'ghost',
            size: 'xl',
          }]"
        orientation="horizontal"
      />
    </div>
    <ArtGallery />
  </div>
</template>
