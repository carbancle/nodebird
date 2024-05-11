<template>
  <q-page>
    <q-container>
      <div>
        <post-card v-for="p in mainPosts" :key="p.id" :post="p" />
      </div>
    </q-container>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, useMeta } from "quasar";
import PostCard from "~/components/PostCard";
import PostForm from "~/components/PostForm";

const $q = useQuasar();

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

const loadPosts = () => {
  store.dispatch(`posts/loadPosts`);
};

const name = ref("Nuxt.js");

const me = computed(() => store.state.users.me);
const mainPosts = computed(() => store.state.posts.mainPosts);
const hasMorePost = computed(() => store.state.posts.hasMorePost);

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
