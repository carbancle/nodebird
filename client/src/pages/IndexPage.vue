<template>
  <q-page>
    <div class="q-ma-sm">
      <PostForm v-if="me" />
    </div>
    <div class="q-ma-sm">
      <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </q-page>
</template>
<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useMeta } from "quasar";
import { useUserStore } from "src/stores/users";
import { usePostStore } from "src/stores/posts";
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";

onMounted(() => {
  posts.loadPosts();
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const users = useUserStore();
const posts = usePostStore();

const me = computed(() => users.me);
const mainPosts = computed(() => posts.mainPosts);
const hasMorePost = computed(() => posts.hasMorePost);

const onScroll = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >
    document.documentElement.scrollHeight - 300
  ) {
    if (hasMorePost.value) {
      posts.loadPosts();
    }
  }
};

useMeta(() => {
  return { title: "메인페이지" };
});
</script>
<style lang="scss" scoped></style>
