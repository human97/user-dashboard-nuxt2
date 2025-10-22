<template>
  <v-card outlined class="user-item-card">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="d-flex justify-space-between align-center flex-wrap">
          <div>
            <v-list-item-title class="text-h5 mb-1">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2">{{ user.phone }}</v-list-item-subtitle>
          </div>
          <v-btn
            :to="`/users/${user.id}`"
            color="accent"
            small
            depressed
          >
            Детали
          </v-btn>
        </div>

        <v-divider class="my-2"></v-divider>

        <v-row dense>
          <v-col cols="12" sm="4">
            <div class="caption grey--text">Город</div>
            <a href="#" @click.prevent="onCityClick">{{ user.city.title }}</a>
          </v-col>
          <v-col cols="6" sm="2">
            <div class="caption grey--text">Баланс</div>
            <div>{{ user.balance }} ₽</div>
          </v-col>
          <v-col cols="6" sm="2">
            <div class="caption grey--text">Накоплено</div>
            <div>{{ user.saveTotal }} ₽</div>
          </v-col>
          <v-col cols="6" sm="2">
            <div class="caption grey--text">Потрачено</div>
            <div>{{ user.spendTotal }} ₽</div>
          </v-col>
          <v-col cols="6" sm="2">
            <div class="caption grey--text">Последний визит</div>
            <div>{{ formattedLastVisit }}</div>
          </v-col>
        </v-row>

      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: 'UserItem',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedLastVisit() {
      return new Date(this.user.lastVisit).toLocaleDateString('ru-RU')
    },
  },
  methods: {
    onCityClick() {
      alert(`Переход к пользователям из города: ${this.user.city.title}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-item-card {
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}
</style>