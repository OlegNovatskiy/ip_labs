<template>
  <v-container>
    <v-row class="text-center">
      <h3 v-if="car">{{car.brand}} {{car.model}} - {{car.article}}</h3>
      <v-col cols="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="form.firstName"
                  label="Прізвище"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="form.lastName"
                  label="Ім'я"
                  required
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <v-text-field
                  v-model="form.birthYear"
                  label="Дата народження"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="addOrder"
            >
              Купити авто
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Car, Order } from '@/interfaces/laba1'

@Component({})
export default class CarSaleForm extends Vue {
  @Prop({ required: false })
  car!: Car | null

  form: Order = {
    car: null,
    firstName: '',
    lastName: '',
    birthYear: 1980
  }

  get valid (): boolean {
    return this.form.car !== null &&
      this.form.firstName !== '' &&
      this.form.lastName !== '' &&
      this.form.birthYear > 1960
  }

  addOrder (): void {
    this.$emit('addOrder', { ...this.form })

    this.form.car = null
    this.form.firstName = ''
    this.form.lastName = ''
    this.form.birthYear = 1980
  }

  @Watch('car')
  watchCar (car: Car): void {
    this.form.car = car
  }
}
</script>

<style lang="scss">
  .container .row button.success.v-btn--contained.theme--light  {
    background-color: green;
  }
</style>
