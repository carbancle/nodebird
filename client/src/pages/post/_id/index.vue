<template>
  <v-container v-if="post">
    <post-card :post="post" />
  </v-container>
  <div v-else>해당 아이디의 게시글이 존재하지 않습니다.</div>
</template>
<script setup>
import { computed } from "vue";
//import PostCard from '../../components/PostCard'
import PostCard from "../components/PostCard";

const post = computed(() =>
  this.$store.state.posts.mainPosts.find(
    (v) => v.id === parseInt(this.$route.params.id, 10)
  )
);
</script>
