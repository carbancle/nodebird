<template>
  <div id="image-zoom">
    <header>
      <h1>상세 이미지</h1>
      <q-icon id="close-btn">mdi-close</q-icon>
    </header>
    <div id="carusel-wrapper">
      <q-carousel
        class="rounded-borders"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
      >
        <q-carousel-slide
          class="column no-wrap flex-center"
          name="style"
          v-for="img in images"
          :key="img.src"
        >
          <q-icon name="style" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            <q-img
              max-height="500"
              contain
              :src="`http://localhost:3085/${img.src}`"
            />
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[
            { label: 1, value: 'style' },
            { label: 2, value: 'tv' },
            { label: 3, value: 'layers' },
            { label: 4, value: 'map' },
          ]"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
const slide = ref("style");

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  closeModal: {
    type: Function,
    required: true,
  },
});

const images = props.images;
const closeModal = props.closeModal;
</script>
