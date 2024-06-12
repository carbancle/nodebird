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
import { computed, nextTick, onBeforeUnmount, onMounted } from "vue";
import { useMeta } from "quasar";
import { useUserStore } from "src/stores/users";
import { usePostStore } from "src/stores/posts";
import PostCard from "../components/PostCard.vue";
import PostForm from "../components/PostForm.vue";

onMounted(async () => {
  Promise.all([
    await posts.loadPosts({ reset: true }),
    window.addEventListener("scroll", onScroll),
  ]);
  nextTick();
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

const metaData = {
  // sets document title
  title: "NodeBird",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  // titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: "description", content: "NodeBird SNS" },
    keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template() {
        return `NodeBird`;
      },
    },
    ogDescription: {
      property: "og:description",
      template() {
        return `vue3 NodeBird`;
      },
    },
    ogType: {
      property: "og:type",
      template() {
        return `My Website`;
      },
    },
    ogImage: {
      property: "og:image",
      template() {
        return `https://vue.nodebird.com/vue-nodebird.png`;
      },
    },
    ogUrl: {
      property: "og:url",
      template() {
        return `https://vue.nodebird.com`;
      },
    },
  },
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },
};
useMeta(metaData);
</script>
<style lang="scss" scoped></style>
