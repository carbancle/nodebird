<template>
  <div class="q-ma-sm">
    <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
  </div>
</template>
<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useMeta } from "quasar";
import { usePostStore } from "src/stores/posts";
import PostCard from "../../../components/PostCard.vue";
import { useRoute } from "vue-router";

const $route = useRoute();
const posts = usePostStore();

onMounted(() => {
  Promise.all([loadPosts(), window.addEventListener("scroll", onScroll)]);
  nextTick();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const loadPosts = () => {
  posts.loadHashtagPosts({ hashtag: $route.params.id, reset: true });
};

const name = ref("Nuxt.js");

const mainPosts = computed(() => posts.mainPosts);
const hasMorePost = computed(() => posts.hasMorePost);

/**
 * params의 id값 (route의 :id) 을 감지(watch)하여 변경될 때마다,
 * loadPost를 재실행해서 올바른 hashtag 검색값을 가져오도록 한다.
 */

// watch(
//   () => $route.params.id,
//   (newId, oldId) => {
//     loadPosts();
//   }
// );

const onScroll = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >
    document.documentElement.scrollHeight - 300
  ) {
    if (hasMorePost.value) {
      loadPosts();
    }
  }
};

useMeta(() => {
  return { title: "메인페이지" };
});
</script>
<style></style>
