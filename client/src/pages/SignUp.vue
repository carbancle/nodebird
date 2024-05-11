<template>
  <q-page>
    <q-container>
      <q-card>
        <q-container>
          <q-subheader>회원가입</q-subheader>
          <q-form @submit.prevent="onSubmitForm">
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
            <q-input
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <q-input
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <q-checkbox
              v-model="terms"
              :rules="termsRules"
              label="회원가입에 동의하십니까?"
              required
            />
            <q-btn color="green" type="submit"> 가입하기 </q-btn>
          </q-form>
        </q-container>
      </q-card>
    </q-container>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const nickname = ref("");
const terms = ref(false);

const emailRules = [
  (v) => !!v || "이메일은 필수입니다.",
  (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다",
];
const nicknameRules = [(v) => !!v || "닉네임은 필수입니다."];
const passwordRules = [(v) => !!v || "비밀번호는 필수입니다."];
const passwordCheckRules = [
  (v) => !!v || "비밀번호 확인은 필수입니다.",
  (v) => v === password.value || "비밀번호가 일치하지 않습니다.",
];
const termsRules = [(v) => !!v || "약관에 동의해야합니다."];

const onSubmitForm = () => {
  if (this.$refs.form.validate()) {
    alert("회원가입 시도!");
  } else {
    alert("폼이 유효하지 않습니다.");
    console.log(valid.value);
  }
};

useMeta(() => {
  return { title: "회원가입" };
});
</script>

<style scoped>
/* Add any scoped styles here */
</style>
