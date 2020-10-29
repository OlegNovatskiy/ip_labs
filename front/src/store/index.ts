import Vue from 'vue'
import Vuex from 'vuex'
import { BasketItem, Pill, Order, OrderItem } from '@/interfaces/laba2'
import PillsService from '@/services/api/PillsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apteka: {
      pills: [],
      categories: [
        { id: 1, name: 'Таблетка' },
        { id: 2, name: 'Крем' },
        { id: 3, name: 'Спрей' },
        { id: 4, name: 'Каплі' },
        { id: 5, name: 'Суспензія' }
      ],
      basket: [],
      orders: []
    }
  },
  mutations: {
    async addPill (state, object: Pill) {
      let index = -1
      if (object.id) {
        index = state.apteka.pills.findIndex((pill: Pill) => pill.id === object.id)
      }

      if (!object.id || index === -1) {
        delete object.id
        const newPill = await PillsService.createPills(object)
        state.apteka.pills.push(newPill)

        return
      }

      object.count = parseInt(state.apteka.pills[index].count) + parseInt(object.count)
      const id = object.id
      delete object.id
      const updatedPill = await PillsService.updatePills(object, id)
      Vue.set(state.apteka.pills, index, updatedPill)
    },
    addToBasket (state, object: BasketItem) {
      const existingIndex = state.apteka.basket.findIndex(
        (basketItem: BasketItem) => basketItem.pillId === object.pillId
      )

      if (existingIndex === -1) {
        state.apteka.basket.push(object)
      } else {
        const existCount = state.apteka.basket[existingIndex].count
        object.count += existCount
        Vue.set(state.apteka.basket, existingIndex, object)
      }
    },
    makeOrder (state) {
      const order: Order = {
        sum: 0,
        items: []
      }

      state.apteka.basket.forEach((basketItem: BasketItem) => {
        const pillIndex = state.apteka.pills.findIndex((pill: Pill) => pill.id === basketItem.pillId)
        if (pillIndex === -1) {
          return
        }
        const pill = state.apteka.pills[pillIndex]
        const availableCount = pill.count > basketItem.count ? basketItem.count : pill.count
        pill.count -= availableCount

        Vue.set(state.apteka.pills, pillIndex, pill)

        const itemSum = availableCount * pill.price
        const orderItem: OrderItem = {
          pillId: pill.id,
          count: availableCount,
          price: pill.price,
          sum: itemSum
        }
        order.sum += itemSum
        order.items.push(orderItem)
      })

      Vue.set(state.apteka, 'basket', [])
      state.apteka.orders.push(order)
    },
    async uploadPills (state) {
      state.apteka.pills = await PillsService.uploadPills()
    },
    async deletePill (state, id: string) {
      const index = state.apteka.pills.findIndex((pill: Pill) => pill.id === id)
      if (index === -1) {
        return
      }
      try {
        await PillsService.deletePill(id)
        Vue.delete(state.apteka.pills, index)
      } catch (e) {
        alert('Сталася помилка при видаленні')
      }
    }
  },
  getters: {
    getAllPills: (state) => {
      return state.apteka.pills
    },
    getAllCategories: (state) => {
      return state.apteka.categories
    },
    getBasket: (state) => {
      return state.apteka.basket
    },
    getOrders: (state) => {
      return state.apteka.orders
    }
  },
  actions: {
  },
  modules: {
  }
})
