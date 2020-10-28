<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="basketHeaders"
          :items="basketItems"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.pillName="{ item }">
            {{ getName(item) }}
          </template>
          <template v-slot:item.price="{ item }">
            {{ getPrice(item) }}
          </template>
          <template v-slot:item.count="{ item }">
            {{ getAvailableCount(item) }} (добавлялось до кошика {{ item.count }})
          </template>
          <template v-slot:item.sum="{ item }">
            {{ getAvailableSum(item) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>Загальна сума замовлення: {{ totalBusketSum() }}</p>
        <v-btn
        color="success"
        @click="createOrder"
        >Створити замовлення</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CarSaleForm from '@/components/laba1/CarSaleForm.vue'
import { Getter } from 'vuex-class'
import { BasketItem, Category, Pill } from '@/interfaces/laba2'

@Component({
  components: {
    CarSaleForm
  }
})
export default class CarList extends Vue {
  @Getter('getAllPills')
  pills!: Pill[]

  @Getter('getAllCategories')
  categories!: Pill[]

  @Getter('getBasket')
  basketItems!: BasketItem[]

  basketHeaders = [
    { text: 'Назва', value: 'pillName' },
    { text: 'Ціна', value: 'price' },
    { text: 'Доступна к-сть', value: 'count' },
    { text: 'Вартість (ше по кількості доступних)', value: 'sum' }
  ]

  curValues = []

  getName (item: BasketItem) {
    const pill = this.pills.find((pill: Pill) => pill.id === item.pillId)
    const category = this.categories.find((category: Category) => category.id === pill.id)

    return `${pill.name}(${category.name})`
  }

  getPrice (item: BasketItem) {
    const pill = this.pills.find((pill: Pill) => pill.id === item.pillId)

    return pill.price
  }

  getAvailableCount (item: BasketItem) {
    const pill = this.pills.find((pill: Pill) => pill.id === item.pillId)

    return pill.count > item.count ? item.count : pill.count
  }

  getAvailableSum (item: BasketItem) {
    const pill = this.pills.find((pill: Pill) => pill.id === item.pillId)

    const availableCount = pill.count > item.count ? item.count : pill.count

    return availableCount * pill.price
  }

  totalBusketSum () {
    let sum = 0

    this.basketItems.forEach((basketItem: BasketItem) => {
      const pill = this.pills.find((pill: Pill) => pill.id === basketItem.pillId)
      const availableCount = pill.count > basketItem.count ? basketItem.count : pill.count

      sum += availableCount * pill.price
    })

    return sum
  }

  createOrder () {
    this.$store.commit('makeOrder')
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
</style>
