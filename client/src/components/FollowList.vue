<template>
  <q-list>
    <q-item>
      <q-item-section>제로초</q-item-section>
      <q-item-section side>
        <q-icon name="mdi-minus-circle-outline" />
      </q-item-section>
    </q-item>
    <q-item v-for="user in users" :key="user.id">
      <q-item-section>{{ user.nickname[0] }}</q-item-section>
      <q-item-section side>
        <q-icon @click="remove(user.id)" name="mdi-minus-circle-outline" />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>히어로</q-item-section>
      <q-item-section side>
        <q-icon name="mdi-minus-circle-outline" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
const props = defineProps(["users", "remove"]);
const users = props.users;
const remove = props.remove;
</script>

<style scoped>
/* Add any scoped styles here */
</style>
