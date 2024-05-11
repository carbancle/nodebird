<template>
  <q-page>
    <q-container>
      <q-card>
        <q-container>
          <q-subheader>프로필</q-subheader>
          <q-form @submit="submitForm">
            <q-input v-model="nickname" label="닉네임" required />
            <q-btn color="blue" type="submit">수정</q-btn>
          </q-form>
        </q-container>
      </q-card>
      <q-card style="margin-bottom: 20px">
        <q-container>
          <q-subheader>팔로잉</q-subheader>
          <FollowList />
        </q-container>
      </q-card>
      <q-card>
        <q-container>
          <q-subheader>팔로워</q-subheader>
          <FollowList />
        </q-container>
      </q-card>
    </q-container>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import FollowList from "../components/FollowList.vue";

const nickname = ref("");
const submitForm = () => {
  // 폼 제출 로직 구현
};

useMeta(() => {
  return { title: "프로필" };
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
