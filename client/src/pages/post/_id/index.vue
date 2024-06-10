<template>
  <div class="q-ma-sm" v-if="post">
    <PostCard :post="post" />
  </div>
  <div v-else>해당 아이디의 게시글이 존재하지 않습니다.</div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "src/stores/posts";
import PostCard from "../../../components/PostCard.vue";

const $route = useRoute();

const posts = usePostStore();

const post = computed(() =>
  posts.mainPosts.find((v) => v.id === parseInt($route.params.id, 10))
);

onMounted(() => {
  posts.loadPost($route.params.id);
});
</script>
