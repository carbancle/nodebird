<template>
  <q-card class="q-pa-sm q-my-sm">
    <q-card-section>
      <div class="row text-subtitle1 q-mb-sm">
        작성자: {{ other?.nickname }}
      </div>
      <div class="row">
        <div class="col">{{ other?.Followings.length }} 팔로잉</div>
        <div class="col">{{ other?.Followers.length }} 팔로워</div>
        <div class="col">{{ other?.Posts.length }} 게시글</div>
      </div>
    </q-card-section>
  </q-card>
  <div>
    <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useQuasar, useMeta } from "quasar";
import { useUserStore } from "src/stores/users";
import { usePostStore } from "src/stores/posts";
import PostCard from "../../../components/PostCard.vue";
import { useRoute } from "vue-router";

const $q = useQuasar();
const $route = useRoute();
const users = useUserStore();
const posts = usePostStore();

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});

const loadPosts = async () => {
  Promise.all([
    await users.loadOther({ userId: $route.params.id }),
    await posts.loadUserPosts({ userId: $route.params.id, reset: true }),
  ]);
  nextTick();
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
  loadPosts();
});

const name = ref("Nuxt.js");

const other = computed(() => users.other);
const mainPosts = computed(() => posts.mainPosts);
console.log(mainPosts, "123");
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
