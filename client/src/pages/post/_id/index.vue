<template>
  <q-page>
    <q-page-container class="custom-container" v-if="post">
      <PostCard :post="post" />
    </q-page-container>
    <div v-else>해당 아이디의 게시글이 존재하지 않습니다.</div>
  </q-page>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "src/stores/posts";
import PostCard from "../../../components/PostCard.vue";

const $router = useRouter();

const posts = usePostStore();

const post = computed(() =>
  posts.mainPosts.find((v) => v.id === parseInt($router.params.id, 10))
);
</script>
