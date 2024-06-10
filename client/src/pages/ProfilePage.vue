<template>
  <div class="q-ma-sm">
    <q-card class="q-mb-md">
      <q-card-section class="q-pa-sm">
        <q-form ref="valid" @submit.prevent="onChangeNickname">
          <div class="text-h6">프로필</div>
          <div class="row items-center">
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
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md">
      <q-card-section class="q-pa-sm">
        <div class="text-h6">팔로잉</div>
        <FollowList :users="followingList" :remove="onRemoveFollowing" />
        <q-btn
          @click="loadMoreFollowings"
          v-if="hasMoreFollowing"
          color="primary"
          >더보기</q-btn
        >
      </q-card-section>
    </q-card>
    <q-card>
      <q-card-section class="q-pa-sm">
        <div class="text-h6">팔로워</div>
        <FollowList :users="followerList" :remove="onRemoveFollower" />
        <q-btn @click="loadMoreFollowers" v-if="hasMoreFollower" color="primary"
          >더보기</q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useMeta } from "quasar";
import "../css/quasar-custom.scss";
import FollowList from "../components/FollowList.vue";
import { useUserStore } from "src/stores/users";

const users = useUserStore();

const valid = ref(false);
const nickname = ref("");
const nicknameRules = ref([(v) => !!v || "닉네임을 입력하세요."]);

onMounted(async () => {
  Promise.all([
    await users.loadFollowings({ offset: 0 }),
    await users.loadFollowers({ offset: 0 }),
  ]);
  nextTick();
});

const followingList = computed(() => users.followingList);
const followerList = computed(() => users.followerList);

const hasMoreFollowing = computed(() => users.hasMoreFollowing);
const hasMoreFollower = computed(() => users.hasMoreFollower);

const onChangeNickname = () => {
  users.changeNickname({ nickname: nickname.value });
};

const onRemoveFollowing = (userId) => {
  users.unfollowing({ userId });
};
const onRemoveFollower = (userId) => {
  users.removeFollower({ userId });
};

const loadMoreFollowings = () => {
  users.loadFollowings();
};
const loadMoreFollowers = () => {
  users.loadFollowers();
};

useMeta(() => {
  return { title: "프로필" };
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
