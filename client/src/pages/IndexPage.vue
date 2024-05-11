<template>
  <q-page>
    <div class="q-ma-sm">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  </q-page>
</template>
<script setup>
import PostCard from "../components/PostCard.vue";

const name = "Quasar";

const head = () => ({
  title: "메인페이지",
});
</script>
<style lang="scss" scoped></style>
