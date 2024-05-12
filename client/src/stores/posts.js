import { defineStore } from "pinia";
import { api } from "boot/axios";

const url = `http://localhost:3085/post`;

const totalPosts = 51;
const limit = 10;

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    mainPosts: [],
    hasMorePost: true,
    imagePaths: [],
  }),
  getters: {
    // Add getters if needed
  },
  actions: {
    async addPost(payload) {
      const data = {
        content: payload.content,
        imagePaths: this.imagePaths,
      };
      const config = {
        withCredentials: true,
      };
      const result = await api.post(`${url}`, data, config);
      const json = result.data;

      this.mainPosts.unshift(json);
      this.imagePaths = [];
    },
    // todolist 삭제 함수부터는 확인 필요
    removePost(payload) {
      const index = this.mainPosts.findIndex((v) => v.id === payload.id);
      this.mainPosts.splice(index, 1);
    },
    loadPosts() {
      if (this.hasMorePost) {
        const diff = totalPosts - this.mainPosts.length; // 아직 안 불러온 게시글 수
        const fakePosts = Array(diff > limit ? limit : diff)
          .fill()
          .map((v) => ({
            id: Math.random().toString(),
            User: {
              id: 1,
              nickname: "제로초",
            },
            content: `Hello infinite scrolling~ ${Math.random()}`,
            Comments: [],
            Images: [],
          }));
        this.mainPosts = this.mainPosts.concat(fakePosts);
        this.hasMorePost = fakePosts.length === limit;
      }
    },
    addComment(payload) {
      const index = this.mainPosts.findIndex((v) => v.id === payload.postId);
      this.mainPosts[index].Comments.unshift(payload);
    },
    async uploadImages(payload) {
      console.log(payload, " :: payload");
      const config = {
        withCredentials: true,
      };

      const result = await api.post(`${url}/images`, payload, config);
      const json = result.data;

      this.imagePaths = this.imagePaths.concat(json);
    },
    removeImagePath(payload) {
      this.imagePaths.splice(payload, 1);
    },
  },
});
