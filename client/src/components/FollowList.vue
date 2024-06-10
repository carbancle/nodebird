<template>
  <q-list class="row">
    <q-item class="col-4" v-for="user in users" :key="user.id">
      <q-item-section>
        <div class="row items-center">
          <q-avatar
            class="q-mr-sm"
            size="40px"
            color="primary"
            text-color="white"
            >{{ user.nickname[0] }}</q-avatar
          >
          <div class="q-mr-lg">{{ user.nickname }}</div>
          <q-icon
            @click="remove(user.id)"
            size="md"
            name="mdi-minus-circle-outline"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["users", "remove"]);
/**
 * store의 계산된 속성을 props로 받을 때,
 * 전달받은 props 속성 또한 계산된 값으로 지정해야한다.
 * 또는 props 를 바로 template에 적용시키면 계산된 값을 받아오는 것으로 추정됨
 * (ex. v-for="user in props.users")
 */
const users = computed(() => props.users);
const remove = props.remove;
</script>

<style scoped>
/* Add any scoped styles here */
</style>
