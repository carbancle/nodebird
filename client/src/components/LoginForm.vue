<template>
  <q-card class="q-ma-sm q-pa-sm" v-if="!me">
    <q-form ref="form" @submit.prevent="onSubmitForm">
      <q-input
        v-model="email"
        label="이메일"
        type="email"
        :rules="emailRules"
        required
      />
      <q-input
        v-model="password"
        label="비밀번호"
        type="password"
        :rules="passwordRules"
        required
      />
      <q-btn class="q-mr-md" color="green" type="submit">로그인</q-btn>
      <q-btn to="/sign-up">회원가입</q-btn>
    </q-form>
  </q-card>
  <q-card class="q-ma-sm q-pa-sm" v-else>
    <div class="row items-center q-mb-md">
      <div class="q-mr-md">{{ me.nickname }} 님 로그인되었습니다.</div>
      <q-btn @click="onLogOut">로그아웃</q-btn>
    </div>
    <div class="row">
      <div class="col">{{ me.Followings.length }} 팔로잉</div>
      <div class="col">{{ me.Followers.length }} 팔로워</div>
      <div class="col">{{ me.Posts.length }} 게시글</div>
    </div>
  </q-card>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "stores/users";

const users = useUserStore();

const valid = ref(false);
const form = ref(null);
const email = ref("");
const password = ref("");
const emailRules = [
  (v) => !!v || "이메일은 필수입니다.",
  (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다",
];
const passwordRules = [(v) => !!v || "비밀번호는 필수입니다."];

const me = computed(() => users.me);

const onSubmitForm = () => {
  form.value.validate().then((success) => {
    if (success) {
      alert("로그인 시도!");
      users.login({
        email: email.value,
        password: password.value,
      });
    } else {
      alert("폼이 유효하지 않습니다.");
      console.log(valid.value);
    }
  });
};

const onLogOut = () => {
  users.logOut();
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
