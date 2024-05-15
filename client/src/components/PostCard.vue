<template>
  <q-card style="margin-bottom: 20px">
    <PostImages :images="post.Images || []" />
    <q-card-section>
      <div>
        <div class="text-h6">
          <router-link :to="`/user/` + post.id">
            {{ post.User.nickname }}
          </router-link>
        </div>
        <div>{{ post.content }}</div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn flat color="orange">
        <q-icon name="mdi-repeat-variant" />
      </q-btn>
      <q-btn flat color="orange">
        <q-icon name="mdi-heart-outline" />
      </q-btn>
      <q-btn @click="onToggleComment" flat color="orange">
        <q-icon name="mdi-comment-outline" />
      </q-btn>
      <q-btn flat color="orange">
        <q-icon name="mdi-dots-horizontal" />
      </q-btn>
    </q-card-actions>
  </q-card>
  <template v-if="commentOpened">
    <CommentForm :post-id="post.id" />
    <q-list>
      <q-item v-for="c in post.Comments" :key="c.id">
        <q-item-section avatar>
          <q-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ c.User.nickname }}</q-item-label>
          <q-item-label caption>{{ c.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </template>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "src/stores/users";
import { usePostStore } from "src/stores/posts";
import CommentForm from "../components/CommentForm.vue";
import PostImages from "../components/PostImages.vue";

const users = useUserStore();
const posts = usePostStore();

const props = defineProps(["post"]);
const post = props.post;
console.log(post);

const commentOpened = ref(false);

const onToggleComment = () => {
  commentOpened.value = !commentOpened.value;
  if (!commentOpened.value) {
    posts.loadComments({ postId: post.id });
  }
};
const onEditPost = () => {};
const onRemovePost = () => {
  posts.remove({ postId: post.id });
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
