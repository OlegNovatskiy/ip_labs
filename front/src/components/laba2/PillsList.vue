<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="pillsHeaders"
          :items="pills"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.category="{ item }">
            {{ getCategoryName(item.category) }}
          </template>
          <template v-slot:item.action="{ item }">
            <label :for="'pills_count_'+item.id">Введіть к-сть</label>
            <input class="pill_count_input" :id="'pills_count_'+item.id" type="number" v-model="curValues[item.id]">
            <v-btn
              color="success"
              class="mr-4" @click="addToBasket(item.id, curValues[item.id])">В кошик</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CarSaleForm from '@/components/laba1/CarSaleForm.vue'
import { Getter } from 'vuex-class'
import { BasketItem, Category, Pill } from '@/interfaces/laba2'
import PillsService from '@/services/api/PillsService'

@Component({
  components: {
    CarSaleForm
  }
})
export default class PillsList extends Vue {
  @Getter('getAllPills')
  pills!: Pill[]

  @Getter('getAllCategories')
  categories!: Pill[]

  pillsHeaders = [
    { text: 'id', value: 'id' },
    { text: 'Категорія', value: 'category' },
    { text: 'Назва', value: 'name' },
    { text: 'Кількість', value: 'count' },
    { text: 'Ціна', value: 'price' },
    { text: 'Остані оновлення', value: 'lastModifiedAt' },
    { text: '', value: 'action' }
  ]

  curValues = []

  getCategoryName (id: number) {
    return this.categories.find((category: Category) => category.id === id).name
  }

  addToBasket (pillId: number, count: number) {
    const basketItem: BasketItem = {
      pillId,
      count: parseInt(count)
    }
    this.$store.commit('addToBasket', basketItem)
    Vue.set(this.curValues, pillId, 0)
  }
}
</script>

<style lang="scss">
table tr td {
  text-align: center;
}

.container .row button.warning.v-btn--contained.theme--light  {
  background-color: yellow;
  color: black;
}

.pill_count_input {
  border: 1px solid black;
  border-radius: 5px;
  margin: 0 5px;
  width: 40px;
}
</style>
