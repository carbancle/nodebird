<template>
  <q-page>
    <q-page-container class="custom-container">
      <q-card>
        <div class="text-h6">회원가입</div>
        <q-form ref="valid" @submit.prevent="onSubmitForm">
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
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useMeta } from "quasar";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/users";

const $router = useRouter();
const users = useUserStore();

const valid = ref(null);
const email = ref("");
const password = ref("");
const passwordCheck = ref("");
const nickname = ref("");
const terms = ref(false);

const emailRules = ref([
  (v) => !!v || "이메일은 필수입니다.",
  (v) => /.+@.+/.test(v) || "이메일이 유효하지 않습니다",
]);
const nicknameRules = ref([(v) => !!v || "닉네임은 필수입니다."]);
const passwordRules = ref([(v) => !!v || "비밀번호는 필수입니다."]);
const passwordCheckRules = ref([
  (v) => !!v || "비밀번호 확인은 필수입니다.",
  (v) => v === password.value || "비밀번호가 일치하지 않습니다.",
]);
const termsRules = ref([(v) => !!v || "약관에 동의해야합니다."]);

const onSubmitForm = () => {
  if (valid.value.validate()) {
    alert("회원가입 시도!");
    let data = {
      nickname: nickname.value,
      email: email.value,
      password: password.value,
    };
    users.signUp(data).then(
      alert("회원가입이 완료되었습니다!"),
      $router.push({
        path: "/",
      })
    );
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
