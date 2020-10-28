import Vue from 'vue'
import Vuex from 'vuex'
import { BasketItem, Pill, Order, OrderItem } from '@/interfaces/laba2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apteka: {
      pills: [
        {
          id: 1,
          category: 1,
          name: 'Анальгін',
          count: 100,
          price: 10,
          lastModifiedAt: '2020-10-23'
        },
        {
          id: 2,
          category: 3,
          name: 'Називін',
          count: 13,
          price: 75,
          lastModifiedAt: '2020-10-23'
        }
      ],
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
    addPill (state, object: Pill) {
      let max = 0
      if (!object.id) {
        state.apteka.pills.forEach((pill: Pill) => {
          if (pill.id > max) {
            max = pill.id
          }
        })

        object.id = max + 1
        object.lastModifiedAt = (new Date()).toDateString()
        state.apteka.pills.push(object)
        return
      }

      const index = state.apteka.pills.findIndex((pill: Pill) => pill.id === object.id)
      if (index === -1) {
        state.apteka.pills.push(object)
      }
      state.apteka.pills[index].count = parseInt(state.apteka.pills[index].count) + parseInt(object.count)
      state.apteka.pills[index].lastModifiedAt = (new Date()).toDateString()
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
