<template>
  <q-form
    ref="valid"
    class="relative q-mb-md"
    @submit.prevent="onSubmitForm"
    @reset="onReset"
  >
    <q-input
      v-model="content"
      type="textarea"
      filled
      label="댓글 달기"
      :hide-details="hideDetails"
      auto-grow
      :success="success"
      :success-message="successMessages"
      @input="onChangeTextarea"
    />
    <q-btn
      class="absolute-bottom-right q-mr-md q-mb-md"
      color="green"
      type="submit"
      >삐약</q-btn
    >
  </q-form>
</template>
<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "src/stores/user";
import { usePostStore } from "src/stores/posts";

const users = useUserStore();
const posts = usePostStore();

const props = defineProps(["postId"]);
const postId = props.postId;

const valid = ref(false);
const content = ref("");
const success = ref(false);
const successMessages = ref("");
const hideDetails = ref(true);

const me = computed(() => users.me);
const onChangeTextarea = (value) => {
  if (value.length) {
    hideDetails.value = true;
    success.value = false;
    successMessages.value = "";
  }
};

const onSubmitForm = () => {
  if (form.value.validate()) {
    const data = {
      id: Date.now(),
      postId: postId.value,
      content: content.value,
      User: {
        nickname: me.value.nickname,
      },
    };

    posts.addComment(data);
  }
};

const onReset = () => {
  content.value = "";
  success.value = true;
  successMessages.value = "댓글이 작성되었습니다.";
  hideDetails.value = false;
};
</script>
