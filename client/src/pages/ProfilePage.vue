<template>
  <q-page>
    <q-page-container class="custom-container">
      <q-card class="q-mb-md">
        <q-form ref="valid" @submit.prevent="onChangeNickname">
          <div class="text-h6 q-ma-sm">프로필</div>
          <div class="row items-center q-mx-md">
            <q-input
              v-model="nickname"
              class="custom-input q-mr-sm"
              label="닉네임"
              :rules="nicknameRules"
              required
            />
            <q-btn class="custom-submit-btn" color="blue" type="submit"
              >수정</q-btn
            >
          </div>
        </q-form>
      </q-card>
      <q-card class="q-mb-md">
        <div class="text-h6 q-ma-sm">팔로잉</div>
        <FollowList :users="followingList" :remove="onRemoveFollowing" />
        <q-btn
          @click="loadMoreFollowings"
          v-if="hasMoreFollowing"
          color="primary"
          >더보기</q-btn
        >
      </q-card>
      <q-card>
        <div class="text-h6 q-ma-sm">팔로워</div>
        <FollowList :users="followerList" :remove="onRemoveFollower" />
        <q-btn @click="loadMoreFollowers" v-if="hasMoreFollower" color="primary"
          >더보기</q-btn
        >
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useMeta } from "quasar";
import { useUserStore } from "src/stores/users";
import "../css/quasar-custom.scss";
import FollowList from "../components/FollowList.vue";

const users = useUserStore();

const valid = ref(false);
const nickname = ref("");
const nicknameRules = ref([(v) => !!v || "닉네임을 입력하세요."]);

const followerList = computed(() => users.followerList);
const followingList = computed(() => users.followingList);
const hasMoreFollower = computed(() => users.hasMoreFollower);
const hasMoreFollowing = computed(() => users.hasMoreFollowing);

console.log(hasMoreFollower.value, hasMoreFollowing.value);

const onChangeNickname = () => {
  users.changeNickname(nickname.value);
};

const onRemoveFollowing = (id) => {
  // console.log("클릭한 대상의 id 값?", id);
  users.removeFollowing(id);
};

const onRemoveFollower = (id) => {
  // console.log("클릭한 대상의 id 값?", id);
  users.removeFollower(id);
};
const loadMoreFollowers = () => {
  users.loadFollowers();
};

const loadMoreFollowings = () => {
  users.loadFollowings();
};

useMeta(() => {
  return { title: "프로필" };
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
