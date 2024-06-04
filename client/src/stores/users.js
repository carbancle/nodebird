import { defineStore } from "pinia";
import { api } from "boot/axios";

const url = `http://localhost:3085/user`;

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
      try {
        const userState = localStorage.getItem("userState");
        if (userState) {
          this.setMe(JSON.parse(userState));
        } else {
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

      const config = {
        withCredentials: true,
      };

      const result = await api.post(`${url}/login`, data, config);
      const json = result.data;

      this.setMe(json);
      localStorage.setItem("userState", JSON.stringify(json));
      console.log(this.me);
    },
    async logOut() {
      const config = {
        withCredentials: true,
      };

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
