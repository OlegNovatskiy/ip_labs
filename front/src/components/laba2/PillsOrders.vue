<template>
  <v-container>
    <v-row class="text-center order" v-for="(order, index) in orders" :key="index">
      <v-col cols="12">
        <h2>Замовлення на суму {{ order.sum }}</h2>
        <v-data-table
          :headers="itemsHeaders"
          :items="order.items"
          :hide-default-footer="true"
          class="elevation-1"
        >
          <template v-slot:item.pillId="{ item }">
            {{ getItemName(item) }}
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
import { Category, Order, OrderItem, Pill } from '@/interfaces/laba2'

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

  @Getter('getOrders')
  orders!: Order[]

  itemsHeaders = [
    { text: 'Назва', value: 'pillId' },
    { text: 'Ціна', value: 'price' },
    { text: 'К-сть', value: 'count' },
    { text: 'Вартість позиції', value: 'sum' }
  ]

  getItemName (item: OrderItem) {
    const pill = this.pills.find((pill: Pill) => pill.id === item.pillId)
    const category = this.categories.find((category: Category) => category.id === pill.id)

    return `${pill.name} (${category.name})`
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

.order {
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;

  h2 {
    text-align: left;
  }
}
</style>
