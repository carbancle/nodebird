<template>
  <q-layout>
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="text-white">NodeBird</router-link>
        </q-toolbar-title>
        <q-input
          class="q-mr-sm"
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
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import LoginForm from "../components/LoginForm.vue";
</script>

<style>
.bg-green {
  background-color: green;
}
</style>
