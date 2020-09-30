<template>
  <div>
   <router-link :to="{ name: 'Laba1' }">ЛР 1</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Header extends Vue {
}
</script>
