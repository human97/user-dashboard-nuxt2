<template>
  <v-container fluid>
    <h1 class="mb-4 text--primary">Пользователи</h1>

    <v-card class="mb-4 pa-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Поиск по имени или телефону"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
            hide-details
            clearable
            :color="focusColor"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedCities"
            :items="allCities"
            label="Фильтр по городам"
            multiple
            outlined
            dense
            hide-details
            chips
            deletable-chips
            clearable
            :menu-props="{ offsetY: true, attach: true }"
            class="city-select-overflow"
            :color="focusColor"
            :item-color="focusColor"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>

    <div v-if="$fetchState.pending">
      <v-skeleton-loader
        v-for="n in 5"
        :key="n"
        type="list-item-avatar-three-line"
        class="mb-2"
      ></v-skeleton-loader>
    </div>

    <div v-else-if="!$fetchState.error">
      <UserList :users="paginatedUsers" />
      <v-pagination
        v-if="pageCount > 1"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        class="mt-4"
      ></v-pagination>
    </div>
    
    <v-alert v-else type="error">
      Не удалось загрузить пользователей. Пожалуйста, попробуйте еще раз.
    </v-alert>

  </v-container>
</template>

<script>
import UserList from '~/components/UserList.vue'
import debounce from 'lodash.debounce'

const ITEMS_PER_PAGE = 50;
const TOTAL_USERS_TO_LOAD = 8000;
const INITIAL_LOAD_LIMIT = 100;
const SUBSEQUENT_LOAD_LIMIT = 500;

export default {
  name: 'UsersPage',
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
      search: '',
      debouncedSearch: '',
      allCities: [],
      selectedCities: [],
      page: 1,
      itemsPerPage: ITEMS_PER_PAGE,
    }
  },
  async fetch() {
    this.users = []

    let loadedUsers = await this.$api.users.list({
      offset: 0,
      limit: INITIAL_LOAD_LIMIT,
    })
    this.users.push(...loadedUsers)

    let offset = INITIAL_LOAD_LIMIT

    const promises = []
    while (offset < TOTAL_USERS_TO_LOAD) {
      const limit = Math.min(SUBSEQUENT_LOAD_LIMIT, TOTAL_USERS_TO_LOAD - offset)
      promises.push(this.$api.users.list({ offset, limit }))
      offset += limit
    }
    
    const results = await Promise.all(promises)
    results.forEach(userBatch => {
      this.users.push(...userBatch)
    })

    const cityTitles = this.users.map(user => user.city.title)
    this.allCities = [...new Set(cityTitles)].sort()
  },
  computed: {
    focusColor() {
      return this.$vuetify.theme.dark ? 'primary' : 'black'
    },
    filteredUsers() {
      return this.users.filter(user => {
        const cityMatch = !this.selectedCities.length || this.selectedCities.includes(user.city.title);

        if (!this.debouncedSearch) {
          return cityMatch;
        }

        const searchTerm = this.debouncedSearch.toLowerCase();
        const searchPhone = this.debouncedSearch.replace(/\D/g, '');

        const nameMatch = user.name.toLowerCase().includes(searchTerm);
        const phoneMatch = searchPhone && user.phone.replace(/\D/g, '').includes(searchPhone);

        return cityMatch && (nameMatch || phoneMatch);
      });
    },
    pageCount() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage)
    },
    paginatedUsers() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredUsers.slice(start, end)
    },
  },
  watch: {
    search: debounce(function (newVal) {
      this.debouncedSearch = newVal
      this.page = 1
    }, 500),
    selectedCities() {
      this.page = 1
    },
  },
}
</script>

<style lang="scss" scoped>
.city-select-overflow {
  :deep(.v-select__selections) {
    flex-wrap: nowrap;
    overflow: hidden;

    .v-chip {
      flex-shrink: 0;
    }
  }
}
</style>