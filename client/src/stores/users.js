import { defineStore } from "pinia";
import { api } from "boot/axios";
import { ref } from "vue";

const url = `http://localhost:3085/user`;
const config = { withCredentials: true };
const isLogin = ref(false);

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
      // 해당 loadUser 함수를 DefaultLayout 에서 onMounted를 사용하여 호출하고 있음
      // DefaultLayout 컴포넌트를 사용하지 않는 경우.. loadUser 함수가 실행되지 않기에 문제가 발생할 수 있다
      try {
        const userState = localStorage.getItem("userState");
        console.log(userState);
        if (userState) {
          console.log("참");
          const result = await api.get(url, config);
          const json = result.data;
          this.setMe(json);
        } else {
          console.log("거짓");
          // localStorage.removeItem("userState");
          // isLogin.value = false;
          // this.me = null;
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

      const config = {
        withCredentials: true,
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
    changeNickname(payload) {
      this.me.nickname = payload.nickname;
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
    loadFollowers() {
      if (this.hasMoreFollower) this.loadFollowersAction();
    },
    loadFollowings() {
      if (this.hasMoreFollowing) this.loadFollowingsAction();
    },
    loadFollowersAction() {
      const totalFollowers = 8;
      const limit = 3;
      const diff = totalFollowers - this.followerList.length;
      const fakeUsers = Array(diff > limit ? limit : diff)
        .fill()
        .map((v) => ({
          id: Math.random().toString(),
          nickname: Math.floor(Math.random() * 1000),
        }));
      this.followerList = this.followerList.concat(fakeUsers);
      this.hasMoreFollower = fakeUsers.length === limit;
    },
    loadFollowingsAction() {
      const totalFollowings = 6;
      const limit = 3;
      const diff = totalFollowings - this.followingList.length;
      const fakeUsers = Array(diff > limit ? limit : diff)
        .fill()
        .map((v) => ({
          id: Math.random().toString(),
          nickname: Math.floor(Math.random() * 1000),
        }));
      this.followingList = this.followingList.concat(fakeUsers);
      this.hasMoreFollowing = fakeUsers.length === limit;
    },
  },
});

/*
  일반적으로 함수 파일을 생성한 뒤 src 폴더 내 main.js 에서 앱 로드전 함수를 호출하는 방식이지만,
  quasar를 사용할 시, main.js를 직접적으로 수정할 수 없기에 다음과 같은 방법을 사용한다.'
  1. 앱 로드시 store를 호출하므로 store에서 함수를 실행하면 전역적으로 실행되는 효과를 얻을 수 있다.
  (현재 사용하고 있는 방법)

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
const users = useUserStore();
users.loadUser();
