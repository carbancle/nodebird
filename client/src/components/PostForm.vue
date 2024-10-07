<template>
  <q-card style="margin-bottom: 20px">
    <q-card-section>
      <q-form ref="valid" @submit.prevent="onSubmitForm" @reset="onReset">
        <q-input
          v-model="content"
          type="textarea"
          class="q-mb-sm"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-bottom-space="hideDetails"
          :rules="[(v) => v === null || !!v.trim() || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
        <div class="row items-center">
          <q-file
            class="custom-input-file q-mr-sm"
            v-model="imageInput"
            @update:model-value="onChangeImages"
            outlined
            :dense="true"
            multiple
            label="이미지 업로드"
          />
          <q-btn
            class="custom-submit-btn"
            type="submit"
            color="green"
            absolute
            right
            >짹짹</q-btn
          >
          <div v-if="isSuccess" class="q-ml-sm text-positive">
            {{ successMessage }}
          </div>
        </div>
        <div>
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <img
              :src="`http://localhost:8081/${p}`"
              :alt="p"
              style="width: 200px"
            />
            <div>
              <button @click="onRemoveImage(i)" type="button">제거</button>
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, computed } from "vue";
import { usePostStore } from "src/stores/posts";
import "../css/quasar-custom.scss";

const posts = usePostStore();

const valid = ref(null);
const hideDetails = ref(true);
const successMessage = ref("");
const isSuccess = ref(false);
const content = ref("");
const imageInput = ref(null);

// const me = computed(() => users.me);
const imagePaths = computed(() => posts.imagePaths);

const onChangeTextarea = (value) => {
  if (value.length) {
    hideDetails.value = true;
    isSuccess.value = false;
    successMessage.value = "";
  }
};
const onSubmitForm = async () => {
  if (valid.value.validate()) {
    let data = {
      content: content.value,
    };
    try {
      console.log(data);
      await posts.addPost(data);
      onReset();
    } catch (err) {
      console.log(err);
    }
  }
};

const onReset = () => {
  isSuccess.value = true;
  successMessage.value = "게시글 등록 성공!";
  content.value = null;
  hideDetails.value = false;
  setTimeout(() => {
    successMessage.value = "";
  }, 2000);
};

const onChangeImages = async () => {
  const imageFormData = new FormData();
  [].forEach.call(imageInput.value, (f) => {
    imageFormData.append(`image`, f); // {image: [file1, file2]}
  });
  // console.log(imageFormData, " :: imageFormData");
  await posts.uploadImages(imageFormData);
};

const onRemoveImage = (index) => {
  posts.removeImagePath(index);
};
</script>
<style lang="scss" scoped></style>
