<template>
  <div v-if="images.length === 0"></div>
  <div v-else-if="images.length === 1">
    <q-img
      :src="`${url}/${images[0].src}`"
      contain
      initial-ratio="2"
      @click="zoomImages"
    />
    <ImageZoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>
  <div class="row" v-else-if="images.length === 2">
    <div class="col">
      <q-img
        :src="`${url}/${images[0].src}`"
        contain
        initial-ratio="2"
        @click="zoomImages"
      />
    </div>
    <div class="col">
      <q-img
        :src="`${url}/${images[1].src}`"
        contain
        initial-ratio="2"
        @click="zoomImages"
      />
    </div>
    <ImageZoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>
  <div class="row" v-else-if="images.length > 2">
    <div class="col">
      <q-img
        :src="`${url}/${images[0].src}`"
        contain
        initial-ratio="2"
        @click="zoomImages"
      />
    </div>
    <div class="col" @click="zoomImages">
      <q-icon name="mdi-dots-horizontal" />
      <div>더보기</div>
    </div>
    <ImageZoom v-if="imageZoomed" :close-modal="closeModal" :images="images" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import ImageZoom from "./ImageZoom.vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const url = process.env.API_URL

const images = props.images;

const imageZoomed = ref(false);

const closeModal = () => {
  imageZoomed.value = !imageZoomed.value;
};

const zoomImages = () => {
  imageZoomed.value = !imageZoomed.value;
};
</script>
<style lang="scss" scoped></style>
