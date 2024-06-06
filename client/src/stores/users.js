import { defineStore } from "pinia";
import { api } from "boot/axios";
import { ref } from "vue";

const url = `http://localhost:3085/user`;
const config = { withCredentials: true };
const isLogin = ref(false);
const limit = 3;

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    me: null,
    followingList: [],
    followerList: [],
    hasMoreFollower: true,
    hasMoreFollowing: true,
  }),
  getters: {
    isAuthenticated: (state) => !!state.me,
    // Add getters if needed
  },
  actions: {
    setMe(payload) {
      this.me = payload;
    },
    clearMe() {
      this.me = null;
    },
    async loadUser() {
      try {
        const userState = localStorage.getItem("userState");
        console.log(userState);
        if (userState) {
          const result = await api.get(url, config);
          const json = result.data;
          this.setMe(json);
        } else {
          localStorage.removeItem("userState");
          isLogin.value = false;
          this.me = null;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async signUp(payload) {
      const data = {
        email: payload.email,
        nickname: payload.nickname,
        password: payload.password,
      };

      const result = await api.post(`${url}`, data);
      const json = result.data;

      this.setMe(json);
    },
    async login(payload) {
      const data = {
        email: payload.email,
        password: payload.password,
      };

      const result = await api.post(`${url}/login`, data, config);
      const json = result.data;

      this.setMe(json);
      isLogin.value = true;
      localStorage.setItem("userState", isLogin.value);
    },
    async logOut() {
      const result = await api.post(`${url}/logout`, {}, config);
      const json = result.data;

      this.clearMe();
      localStorage.removeItem("userState");
    },
    // todolist > nuxt store 구조를 pinia store로 변경 해야함
    async changeNickname(payload) {
      try {
        await api.patch(
          `${url}/nickname`,
          { nickname: payload.nickname },
          config
        );

        this.me.nickname = payload.nickname;
      } catch (err) {
        console.error(err);
      }
    },
    addFollowing(payload) {
      this.followingList.push(payload);
    },
    addFollower(payload) {
      this.followerList.push(payload);
    },
    removeFollowing(payload) {
      const index = this.followingList.findIndex((v) => v.id === payload.id);
      this.followingList.splice(index, 1);
    },
    removeFollower(payload) {
      const index = this.followerList.findIndex((v) => v.id === payload.id);
      this.followerList.splice(index, 1);
    },
    async loadFollowings(payload) {
      let offset = this.followerList.length;

      if (!(payload && payload.offset === 0) && !this.hasMoreFollowing) return;
      if (payload && payload.offset === 0) offset = 0;
      const result = await api.get(
        `${url}/${this.me.id}/followings?limit=3&offset=${offset}`,
        config
      );
      const json = result.data;

      if (payload.offset === 0) {
        this.followingList = json;
      } else {
        this.followingList = this.followingList.concat(json);
      }
      this.hasMoreFollowing = json.length === limit;
    },
    async loadFollowers(payload) {
      let offset = this.followerList.length;

      if (!(payload && payload.offset === 0) && !this.hasMoreFollower) return;
      if (payload && payload.offset === 0) offset = 0;
      const result = await api.get(
        `${url}/${this.me.id}/followers?limit=3&offset=${offset}`,
        config
      );
      const json = result.data;

      if (payload.offset === 0) {
        this.followerList = json;
      } else {
        this.followerList = this.followerList.concat(json);
      }
      this.hasMoreFollower = json.length === limit;
    },
    async following(payload) {
      try {
        const result = await api.post(
          `${url}/${payload.userId}/follow`,
          payload,
          config
        );
        const json = result.data;

        this.me.Followings.push({ id: payload.userId });
      } catch (err) {
        console.error(err);
      }
    },
    async unfollowing(payload) {
      try {
        await api.delete(`${url}/${payload.userId}/unfollow`, config);

        const index = this.me.Followings.findIndex(
          (v) => v.id === payload.userId
        );
        this.me.Followings.splice(index, 1);
      } catch (err) {
        console.error(err);
      }
    },
    // loadFollowersAction() {
    //   const totalFollowers = 8;
    //   const limit = 3;
    //   const diff = totalFollowers - this.followerList.length;
    //   const fakeUsers = Array(diff > limit ? limit : diff)
    //     .fill()
    //     .map((v) => ({
    //       id: Math.random().toString(),
    //       nickname: Math.floor(Math.random() * 1000),
    //     }));
    //   this.followerList = this.followerList.concat(fakeUsers);
    //   this.hasMoreFollower = fakeUsers.length === limit;
    // },
    // loadFollowingsAction() {
    //   const totalFollowings = 6;
    //   const limit = 3;
    //   const diff = totalFollowings - this.followingList.length;
    //   const fakeUsers = Array(diff > limit ? limit : diff)
    //     .fill()
    //     .map((v) => ({
    //       id: Math.random().toString(),
    //       nickname: Math.floor(Math.random() * 1000),
    //     }));
    //   this.followingList = this.followingList.concat(fakeUsers);
    //   this.hasMoreFollowing = fakeUsers.length === limit;
    // },
  },
});

/*
  일반적으로 함수 파일을 생성한 뒤 src 폴더 내 main.js 에서 앱 로드전 함수를 호출하는 방식이지만,
  quasar를 사용할 시, main.js를 직접적으로 수정할 수 없기에 다음과 같은 방법을 사용한다.'
  1. 앱 로드시 store를 호출하므로 store에서 함수를 실행하면 전역적으로 실행되는 효과를 얻을 수 있다.
  (현재 사용하고 있는 방법 => 기각)
  quasar에서 앱 로드시 순서 app.vue is loaded => store is imported => router is imported => boot is imported
  이 경우, store가 가장 먼저 로드되어 router에서 store를 사용할 수 없는 상황이 발생해버림
  (store에서 store 함수 실행, router에서 store를 호출하지 않았는데 store 함수 실행 요청이 들어가서 에러)
  따라서 아래 2번 방식인 boot시에 로그인 유지 store를 불러오도록 수정

  2. 정석적인 방법은 boot 폴더에 앱 로드전 실행할 js 파일을 생성한 뒤,
    quasar.config.js 파일의 boot 경로에 해당 파일을 등록해주는 방식을 사용한다.
  --------- 예시 ------------
  quasar.config.js
  boot: [
    '앱 로드 전 실행할 파일.js',
    '앱 로드 전 실행할 파일2.js',
    ...
  ],
*/
