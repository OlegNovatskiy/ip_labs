<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>Лабораторна робота 2</h1>
        <h2>Розробити Web - додаток. Використати просту модель предметної області «Аптека». Виконати необхідні розрахунки.</h2>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col cols="12 menu-laba-2">
        <router-link class="btn btn-primary" :to="{ name: 'laba2' }">Каталог таблеток</router-link>
        <router-link :to="{ name: 'basket' }">Кошик</router-link>
        <router-link :to="{ name: 'add_pill' }">Добавити таблетки</router-link>
        <router-link :to="{ name: 'pills_orders' }">Замовлення</router-link>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Laba2 extends Vue {
  created () {
    console.log(this.$store.getters)
  }
}
</script>

<style lang="scss">
.menu-laba-2 {
  a {
    margin-right: 10px;
  }
}
</style>
