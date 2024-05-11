<template>
  <q-card style="margin-bottom: 20px">
    <q-card-section>
      <q-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <q-input
          v-model="content"
          type="textarea"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있었나요?"
          :hide-details="hideDetails"
          :success-messages="successMessages"
          :success="success"
          :rules="[(v) => !!v.trim() || '내용을 입력하세요']"
          @input="onChangeTextarea"
        />
        <div class="row items-center">
          <q-file
            class="custom-input-file q-mr-sm"
            v-model="imageInput"
            @change="onChangeImages"
            outlined
            :dense="true"
            mutiple
            append
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
        </div>
        <div>
          <div
            v-for="(p, i) in imagePaths"
            :key="p"
            style="display: inline-block"
          >
            <img
              :src="`http://localhost:3085/${p}`"
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
import { api } from "boot/axios";
import { useUserStore } from "src/stores/user";
import { usePostStore } from "src/stores/posts";
import "../css/quasar-custom.scss";

const user = useUserStore();
const post = usePostStore();

const valid = ref(false);
const hideDetails = ref(true);
const successMessages = ref("");
const success = ref(false);
const content = ref("");
const imageInput = ref(null);

// todolist mapState로 가져온 me와 imagePaths 정보에 대한 이해 필요
const users = computed(() => user.me);
const posts = computed(() => post.imagePaths);

// computed: {
//   ...mapState("users", ["me"]),
//   ...mapState("posts", ["imagePaths"]),
// },
const onChangeTextarea = (value) => {
  if (value.length) {
    this.hideDetails = true;
    this.success = false;
    this.successMessages = "";
  }
};
const onSubmitForm = async () => {
  if (this.$refs.form.validate()) {
    let data = {
      content: this.content,
      User: {
        nickname: this.me.nickname,
      },
      Comments: [],
      Images: [],
      id: Date.now(),
      createdAt: Date.now(),
    };
    try {
      await post.addPost(data);

      this.content = "";
      this.hideDetails = false;
      this.success = true;
      this.successMessages = "게시글 등록 성공!";
    } catch (err) {
      console.log(err);
    }
  }
};

const onChangeImages = (e) => {
  console.log(e.target.files);
  const imageFormData = new FormData();
  [].forEach.call(e.target.files, (f) => {
    imageFormData.append(`image`, f); // {image: [file1, file2]}
  });
  post.uploadImages(imageFormData);
};

const onRemoveImage = (index) => {
  post.removeImagePath(index);
};
</script>
<style lang="scss" scoped></style>
