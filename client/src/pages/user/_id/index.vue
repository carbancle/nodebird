<template>
  <q-page>
    <q-page-container class="custom-container">
      <div>
        <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
      </div>
    </q-page-container>
  </q-page>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, useMeta } from "quasar";
import { useUserStore } from "src/stores/user";
import { usePostStore } from "src/stores/posts";
import PostCard from "../../../components/PostCard.vue";
import PostForm from "../../../components/PostForm.vue";

const $q = useQuasar();
const users = useUserStore();
const posts = usePostStore();

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

const loadPosts = () => {
  posts.loadPosts();
};

const name = ref("Nuxt.js");

const me = computed(() => users.me);
const mainPosts = computed(() => posts.mainPosts);
const hasMorePost = computed(() => posts.hasMorePost);

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
