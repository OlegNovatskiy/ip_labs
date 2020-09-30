<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="carsHeaders"
          :items="cars"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              color="warning"
              class="mr-4"
              @click="selectCar(item)"
            >
              Купити
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <h2>Покупки</h2>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table
          :headers="ordersHeaders"
          :items="orders"
          :items-per-page="5"
          class="elevation-1"
        >

        </v-data-table>
      </v-col>
    </v-row>
    <h2>Форма покупки авто</h2>
    <v-row class="text-center">
      <v-col cols="12">
        <CarSaleForm :car="selectedCar" @addOrder="addOrder"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Car, Order } from '@/interfaces/laba1'
import CarSaleForm from '@/components/laba1/CarSaleForm.vue'

@Component({
  components: {
    CarSaleForm
  }
})
export default class CarList extends Vue {
  cars: Car[] = [
    {
      article: 23123,
      brand: 'Opel',
      model: 'Insignia',
      year: 2011,
      price: 10000
    },
    {
      article: 23111,
      brand: 'Renault',
      model: 'Megane',
      year: 2009,
      price: 8000
    }
  ]

  carsHeaders = [
    { text: 'Артикул', value: 'article', align: 'left' },
    { text: 'Бренд', value: 'brand' },
    { text: 'Модель', value: 'model' },
    { text: 'Рік', value: 'year' },
    { text: 'Ціна', value: 'price' },
    { text: 'Дії', value: 'actions' }
  ]

  ordersHeaders = [
    { text: 'Артикул авто', value: 'car.article', alight: 'left' },
    { text: 'Прізвище', value: 'firstName' },
    { text: 'Імя', value: 'lastName' },
    { text: 'Рік народження', value: 'birthYear' }
  ]

  orders: Order[] = [
    {
      car: {
        article: 23123,
        brand: 'Opel',
        model: 'Insignia',
        year: 2011,
        price: 10000
      },
      firstName: 'Паляниця',
      lastName: 'Руслан',
      birthYear: 2001
    }
  ]

  selectedCar: Car | null = null

  selectCar (car: Car): void {
    this.selectedCar = car
  }

  addOrder (order: Order): void {
    this.orders.push(order)
    this.selectedCar = null
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
