<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Лабораторна робота 1</h1>
        <h2>Розробити web – додаток, що буде представляти примітивну емуляцію салону по продажу автомобілів, в якому ми зможемо переглядати список автомобілів і оформляти покупку.</h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12">
        <car-list></car-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CarList from '@/components/laba1/CarList.vue'

@Component({
  components: {
    CarList
  }
})
export default class Laba1 extends Vue {
}
</script>
