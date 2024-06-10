import { defineStore } from "pinia";
import { api } from "boot/axios";
import { throttle } from "quasar";

const url = `http://localhost:3085/post`;
const userUrl = `http://localhost:3085/user`;
const config = { withCredentials: true };
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
        image: this.imagePaths,
      };
      const result = await api.post(`${url}`, data, config);
      const json = result.data;

      this.mainPosts.unshift(json);
      this.imagePaths = [];
    },
    // todolist 삭제 함수부터는 확인 필요
    loadPosts: throttle(async function (payload) {
      try {
        if (payload && payload.reset) {
          const result = await api.get(`${url}s?limit=${limit}`);
          const json = result.data;

          this.mainPosts = json;
          this.hasMorePost = json.length === limit;
          return;
        }
        if (this.hasMorePost) {
          const lastPost = this.mainPosts[this.mainPosts.length - 1];
          const result = await api.get(
            // `${url}s?offset=${this.mainPosts.length}&limit=10`
            `${url}s?lastId=${lastPost && lastPost.id}&limit=${limit}`
          );
          const json = result.data;

          this.mainPosts = this.mainPosts.concat(json);
          this.hasMorePost = json.length === limit;
        }
      } catch (err) {
        console.log(err);
      }
    }, 1500),
    loadUserPosts: throttle(async function (payload) {
      try {
        if (payload && payload.reset) {
          const result = await api.get(
            `${userUrl}/${payload.userId}/posts?limit=${limit}`
          );
          const json = result.data;

          this.mainPosts = json;
          this.hasMorePost = json.length === limit;

          return;
        }
        if (this.hasMorePost) {
          const lastPost = this.mainPosts[this.mainPosts.length - 1];
          const result = await api.get(
            // `${url}s?offset=${this.mainPosts.length}&limit=10`
            `${userUrl}/${payload.userId}/posts?lastId=${
              lastPost && lastPost.id
            }&limit=${limit}`
          );
          const json = result.data;

          this.mainPosts = this.mainPosts.concat(json);
          this.hasMorePost = json.length === limit;
        }
      } catch (err) {
        console.log(err);
      }
    }, 1500),
    async removePost(payload) {
      try {
        await api.delete(`${url}/${payload.postId}`, config);

        const index = this.mainPosts.findIndex((v) => v.id === payload.postId);
        this.mainPosts.splice(index, 1);
      } catch (err) {
        console.log(err);
      }
    },
    async addComment(payload) {
      try {
        const result = await api.post(
          `${url}/${payload.postId}/comment`,
          {
            content: payload.content,
            imagePaths: this.imagePaths,
          },
          config
        );
        const json = result.data;

        const index = this.mainPosts.findIndex((v) => v.id === json.postId);
        this.mainPosts[index].Comments.unshift(json);
      } catch (err) {
        console.log(err);
      }
    },
    async loadComments(payload) {
      try {
        const result = api.get(`${url}/${payload.postId}/comments`);
        const json = result.data;

        const index = this.mainPosts.findIndex((v) => v.id === json.postId);
        this.mainPosts[index].Comments = json;
      } catch (err) {
        console.log(err);
      }
    },
    async uploadImages(payload) {
      console.log(payload, " :: payload");

      const result = await api.post(`${url}/images`, payload, config);
      const json = result.data;

      this.imagePaths = this.imagePaths.concat(json);
    },
    removeImagePath(payload) {
      this.imagePaths.splice(payload, 1);
    },
    async retweet(payload) {
      try {
        const result = await api.post(
          `${url}/${payload.postId}/retweet`,
          payload,
          config
        );
        const json = result.data;
        this.addPost(json);
      } catch (err) {
        console.error(err);
        alert(err.response.data);
      }
    },
    async likePost(payload) {
      try {
        const result = await api.post(
          `${url}/${payload.postId}/like`,
          payload,
          config
        );
        const json = result.data;

        const index = this.mainPosts.findIndex((v) => v.id === payload.postId);
        this.mainPosts[index].Likers.push({
          id: json.userId,
        });
      } catch (err) {
        console.error(err);
        alert(err.response.data);
      }
    },
    async unlikePost(payload) {
      try {
        const result = await api.delete(
          `${url}/${payload.postId}/like`,
          config
        );
        const json = result.data;

        const index = this.mainPosts.findIndex((v) => v.id === payload.postId);
        const userIndex = this.mainPosts[index].Likers.findIndex(
          (v) => v.id === json.userId
        );
        this.mainPosts[index].Likers.splice(userIndex, 1);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
