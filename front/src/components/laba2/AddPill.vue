<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                class="d-flex"
                cols="12"
                sm="2"
              >
                <p>Обрати таблекти для додавання кількості існуючих</p>
              </v-col>
              <v-col
                class="d-flex"
                cols="10"
                sm="10"
              >
                <v-select
                  :items="pills"
                  label="Існуючі таблетки"
                  :item-text="'name'"
                  :item-value="'id'"
                  filled
                  dense
                  v-model="existingPill"
                  return-object
                  single-line
                ></v-select>
              </v-col>
            </v-row>
            <hr>
            <v-row>
              <v-col
                class="d-flex"
                cols="6"
              >
                <v-text-field
                  v-model="pillForm.name"
                  label="Назва"
                  required
                  :disabled="!isFieldEditable"
                ></v-text-field>
              </v-col>
              <v-col
                class="d-flex"
                cols="6"
              >
                <v-select
                  :items="categories"
                  label="Категорія"
                  :item-text="'name'"
                  :item-value="'id'"
                  filled
                  dense
                  v-model="pillForm.category"
                  single-line
                  :disabled="!isFieldEditable"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="d-flex"
                cols="6">
                <v-text-field
                  v-model="pillForm.count"
                  label="Кількість"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                class="d-flex"
                cols="6">
                <v-text-field
                  v-model="pillForm.price"
                  label="Ціна"
                  required
                  :disabled="!isFieldEditable"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              color="success"
              class="mr-4"
              @click="addPill"
            >
              Добавити таблетки
            </v-btn>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import CarSaleForm from '@/components/laba1/CarSaleForm.vue'
import { Category, Pill, PillForm } from '@/interfaces/laba2'

@Component({
  components: {
    CarSaleForm
  }
})
export default class CarList extends Vue {
  @Getter('getAllCategories')
  categories!: Pill[]

  @Getter('getAllPills')
  pills!: Pill[]

  isFieldEditable = true
  pillForm: PillForm = {
    id: null,
    category: null,
    name: null,
    count: null,
    price: null
  }

  created () {
    console.log(this.pills)
  }

  existingPill: Pill | null = null

  getCategoryName (id: number) {
    return this.categories.find((category: Category) => category.id === id).name
  }

  async addPill () {
    if (this.pillForm.category === null ||
      this.pillForm.name === null ||
      this.pillForm.count === null ||
      this.pillForm.price === null ||
      this.pillForm.count <= 0 ||
      this.pillForm.price <= 0
    ) {
      alert('Форма невалідна')
      return
    }

    await this.$store.commit('addPill', { ...this.pillForm })

    this.resetForm()
    // console.log(this.pillForm)
  }

  @Watch('existingPill')
  watchExistingPill (newValue: Pill | null) {
    if (newValue !== null) {
      this.isFieldEditable = false
      this.pillForm.id = newValue.id
      this.pillForm.category = newValue.category
      this.pillForm.name = newValue.name
      this.pillForm.count = 0
      this.pillForm.price = newValue.price
    } else {
      this.resetForm()
    }
  }

  resetForm () {
    this.isFieldEditable = true
    this.pillForm.id = null
    this.pillForm.category = null
    this.pillForm.name = null
    this.pillForm.count = 0
    this.pillForm.price = null
    this.existingPill = null
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
