<template>
  <PostImages :images="post.Images || []" />
  <q-card-section>
    <div>
      <div class="row items-center text-h6">
        <router-link class="q-mr-md" :to="`/user/` + post.User.id">
          {{ post.User.nickname }}
        </router-link>
        <q-btn
          v-if="canFollow"
          @click="onFollow"
          color="primary"
          label="팔로우"
        />
        <q-btn
          v-if="canUnfollow"
          @click="onUnfollow"
          color="red"
          label="언팔로우"
        />
      </div>
      <div>
        <template v-for="(node, i) in nodes">
          <router-link
            class="text-primary"
            v-if="node.startsWith('#')"
            :key="i"
            :to="`/hashtag/${node.slice(1)}`"
            >{{ node }}</router-link
          >
          <template v-else>{{ node }}</template>
        </template>
        <!-- {{ post.content }} -->
      </div>
      <div>{{ $dayjs(post.createdAt).fromNow() }}</div>
    </div>
  </q-card-section>
</template>
<script setup>
import { computed } from "vue";
import { useUserStore } from "src/stores/users";
import PostImages from "./PostImages.vue";

const props = defineProps(["post"]);
const post = props.post;

const users = useUserStore();

const me = computed(() => {
  return users.me;
});

const nodes = computed(() => post.content.split(/(#[^\s#]+)/));

const canFollow = computed(() => {
  return (
    me.value && // 로그인 정보 확인
    post.User.id !== me.value.id && // 작성자 정보 확인(글 작성자가 본인이 아닌지 확인)
    !me.value.Followings.find((v) => v.id === post.User.id) // 이미 팔로우 한 상태가 아닌지 확인
  );
});

const canUnfollow = computed(() => {
  return (
    me.value && // 로그인 정보 확인
    post.User.id !== me.value.id && // 작성자 정보 확인(글 작성자가 본인이 아닌지 확인)
    me.value.Followings.find((v) => v.id === post.User.id) // 이미 팔로우 한 상태가 아닌지 확인
  );
});

const onFollow = () => {
  users.following({ userId: post.User.id });
};

const onUnfollow = () => {
  users.unfollowing({ userId: post.User.id });
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
