<template>
  <div id="app">
    <v-app>
      <Layout />
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/common/layout/Layout.vue'

@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {
}
</script>
