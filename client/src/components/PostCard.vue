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
      <q-btn flat color="orange" @click="onClickHeart">
        <q-icon :name="heartIcon" />
      </q-btn>
      <q-btn @click="onToggleComment" flat color="orange">
        <q-icon name="mdi-comment-outline" />
      </q-btn>
      <q-btn flat color="orange" icon="mdi-dots-horizontal">
        <q-menu>
          <q-list>
            <q-item clickable @click="onRemovePost" v-close-popup>
              <q-item-section dark color="red">삭제</q-item-section>
            </q-item>
            <q-item clickable @click="onEditPost" v-close-popup>
              <q-item-section text color="orange">수정</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
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
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/users";
import { usePostStore } from "src/stores/posts";
import CommentForm from "../components/CommentForm.vue";
import PostImages from "../components/PostImages.vue";

const users = useUserStore();
const posts = usePostStore();

const props = defineProps(["post"]);
const post = props.post;
// console.log(post);

const commentOpened = ref(false);

const onToggleComment = async () => {
  commentOpened.value = !commentOpened.value;
  if (!commentOpened.value) {
    await posts.loadComments({ postId: post.id });
  }
};
const onEditPost = () => {};
const onRemovePost = async () => {
  await posts.removePost({ postId: post.id });
};

const me = computed(() => {
  return users.me;
});

const liked = computed(() => {
  return (post.Likers || []).find((v) => v.id === (me.value && me.value.id));
});

const heartIcon = computed(() => {
  return liked.value ? "mdi-heart" : "mdi-heart-outline";
});
const onRetweet = () => {
  if (!me.value) {
    return alert("로그인이 필요합니다.");
  }
  posts.retweet({ postId: post.id });
};
const onClickHeart = () => {
  if (!me.value) {
    return alert("로그인이 필요합니다.");
  }
  console.log(me.value);
  if (me.value.id === post.UserId) {
    return alert("자신의 글에 좋아요를 누를 수 없습니다.");
  }
  if (liked.value) {
    return posts.unlikePost({ postId: post.id });
  }
  return posts.likePost({ postId: post.id });
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
