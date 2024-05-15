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
  post.loadPosts();
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const user = useUserStore();
const post = usePostStore();

const me = computed(() => user.me);
const mainPosts = computed(() => post.mainPosts);
const hasMorePost = computed(() => post.hasMorePost);

const onScroll = () => {
  if (
    window.scrollY + document.documentElement.clientHeight >
    document.documentElement.scrollHeight - 300
  ) {
    if (hasMorePost.value) {
      post.loadPosts();
    }
  }
};

useMeta(() => {
  return { title: "메인페이지" };
});
</script>
<style lang="scss" scoped></style>
