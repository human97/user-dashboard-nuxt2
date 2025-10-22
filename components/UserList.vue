<template>
  <v-row dense>
    <v-col
      v-for="user in users"
      :key="user.id"
      cols="12"
    >
      <UserItem :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import UserItem from '~/components/UserItem.vue'

export default {
  name: 'UserList',
  components: {
    UserItem,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
}
</script>