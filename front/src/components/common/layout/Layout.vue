<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/common/layout/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class Layout extends Vue {
}
</script>
