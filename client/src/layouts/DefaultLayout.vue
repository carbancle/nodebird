<template>
  <q-layout>
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white">NodeBird</router-link>
        </q-toolbar-title>
        <q-form @submit.prevent="onSearchHashtag">
          <q-input
            class="q-mr-sm"
            v-model="hashtag"
            color="white"
            label-color="white"
            :dense="true"
            type="search"
            label="검색"
          >
            <template v-slot:prepend>
              <q-icon color="white" name="mdi-magnify" />
            </template>
          </q-input>
        </q-form>
        <q-btn to="/profile" flat text-color="white" label="프로필" />
        <q-btn to="/sign-up" flat text-color="white" label="회원가입" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="row">
        <div class="col-12 col-xs-12 col-md-4">
          <login-form />
        </div>
        <div class="col-12 col-xs-12 col-md-8">
          <router-view :key="$route.fullPath" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LoginForm from "../components/LoginForm.vue";

const $route = useRoute();
const $router = useRouter();

const hashtag = ref("");

const onSearchHashtag = () => {
  $router.push({
    path: `/hashtag/${encodeURIComponent(hashtag.value)}`,
  });
  hashtag.value = "";
};
</script>

<style>
.bg-green {
  background-color: green;
}
</style>
