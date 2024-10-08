<template>
  <div id="image-zoom">
    <header>
      <h1>상세 이미지</h1>
      <q-icon id="close-btn" name="mdi-close" @click="closeModal" />
    </header>
    <div id="carousel-wrapper">
      <q-carousel
        class="rounded-borders"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        swipeable
        infinite
        arrows
        navigation
        control-color="black"
        dark
      >
        <q-carousel-slide
          class="column no-wrap flex-center"
          :name="index"
          v-for="(img, index) in images"
          :key="img.src"
        >
          <q-img :src="`${url}/${img.src}`" />
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const slide = ref(0);

const url = process.env.API_URL;

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

console.log(images);
</script>
<style lang="scss" scoped>
#image-zoom {
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  header {
    height: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;

    h1 {
      margin: 0;
      font-size: 17px;
      color: #333;
      line-height: 44px;
    }

    #close-btn {
      position: absolute;
      right: 0;
      top: 0;
      padding: 15px;
      line-height: 14px;
      cursor: pointer;
    }
  }

  #carousel-wrapper {
    height: calc(100% - 44px);
    background: rgb(9, 9, 9, 0.6);
  }
}

.q-panel > div {
  margin: auto;
}
</style>
