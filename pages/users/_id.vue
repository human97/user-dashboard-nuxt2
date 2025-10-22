<template>
  <v-container>
    <v-btn to="/users" text class="mb-4">
      <v-icon left>mdi-arrow-left</v-icon>
      Назад к списку
    </v-btn>

    <v-card>
      <v-card-title class="text-h4">
        {{ user.name }}
        <v-chip :color="user.isBlocked ? 'error' : 'success'" small class="ml-4">
          {{ user.isBlocked ? 'Заблокирован' : 'Активен' }}
        </v-chip>
      </v-card-title>
      <v-card-subtitle>{{ user.phone }} | {{ user.role }}</v-card-subtitle>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <!-- Левая колонка -->
          <v-col cols="12" md="6">
            <v-list dense>
              <v-list-item>
                <v-list-item-icon><v-icon>mdi-city</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.city.title }}</v-list-item-title>
                  <v-list-item-subtitle>Город</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon><v-icon>mdi-wallet</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.balance }} ₽</v-list-item-title>
                  <v-list-item-subtitle>Баланс</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon><v-icon>mdi-percent</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.cashbackPercent }}%</v-list-item-title>
                  <v-list-item-subtitle>Процент кэшбэка</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

          <!-- Правая колонка -->
          <v-col cols="12" md="6">
            <v-list dense>
              <v-list-item>
                <v-list-item-icon><v-icon>mdi-database-plus</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.saveTotal }} ₽ ({{ user.saveCount }} раз)</v-list-item-title>
                  <v-list-item-subtitle>Всего накоплено</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon><v-icon>mdi-database-minus</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ user.spendTotal }} ₽ ({{ user.spendCount }} раз)</v-list-item-title>
                  <v-list-item-subtitle>Всего потрачено</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <strong>Последнее сохранение:</strong> {{ formatDate(user.lastSave) }}
          </v-col>
          <v-col cols="12" sm="4">
            <strong>Последняя трата:</strong> {{ formatDate(user.lastSpend) }}
          </v-col>
          <v-col cols="12" sm="4">
            <strong>Последний визит:</strong> {{ formatDate(user.lastVisit) }}
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" sm="4">
            <strong>Обновлено:</strong> {{ formatDate(user.updatedAt) }}
          </v-col>
          <v-col cols="12" sm="4">
            <strong>Создано:</strong> {{ formatDate(user.createdAt) }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'UserDetailPage',
  async asyncData({ params, $api, error }) {
    const user = await $api.users.get(params.id);
    if (user) {
      return { user };
    } else {
      error({ statusCode: 404, message: 'Пользователь не найден' });
    }
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('ru-RU');
    }
  },
  head() {
    return {
      title: this.user ? this.user.name : 'Пользователь'
    }
  }
}
</script>