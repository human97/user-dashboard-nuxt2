<template>
  <v-container fluid>
    <h1 class="mb-4">Пользователи</h1>

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

export default {
  name: 'UsersPage',
  components: {
    UserList,
  },
  data() {
    return {
      users: [],
      search: '',
      allCities: [],
      selectedCities: [],
      page: 1,
      itemsPerPage: 50,
    }
  },
  async fetch() {
    this.users = []
    const totalUsersToLoad = 8000
    const firstLoadLimit = 100
    const subsequentLoadLimit = 500

    let loadedUsers = await this.$api.users.list({
      offset: 0,
      limit: firstLoadLimit,
    })
    this.users.push(...loadedUsers)

    let offset = firstLoadLimit

    const promises = []
    while (offset < totalUsersToLoad) {
      const limit = Math.min(subsequentLoadLimit, totalUsersToLoad - offset)
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
    filteredUsers() {
      let users = this.users

      if (this.selectedCities.length > 0) {
        users = users.filter(user => this.selectedCities.includes(user.city.title))
      }

      if (this.search) {
        const searchTerm = this.search.toLowerCase()
        const searchPhone = this.search.replace(/\D/g, '')
        users = users.filter(user =>
          user.name.toLowerCase().includes(searchTerm) ||
          (searchPhone && user.phone.replace(/\D/g, '').includes(searchPhone))
        )
      }

      return users
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
    search() {
      this.page = 1
    },
    selectedCities() {
      this.page = 1
    },
  },
}
</script>