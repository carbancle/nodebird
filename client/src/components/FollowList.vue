<template>
  <q-list>
    <q-item v-for="user in users" :key="user.id">
      <q-item-section>
        <div class="row items-center">
          <q-avatar
            class="q-mr-sm"
            size="40px"
            color="primary"
            text-color="white"
            >{{ user.nickname[0] }}</q-avatar
          >
          {{ user.nickname }}
        </div>
      </q-item-section>
      <q-item-section side>
        <q-icon @click="remove(user.id)" name="mdi-minus-circle-outline" />
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
