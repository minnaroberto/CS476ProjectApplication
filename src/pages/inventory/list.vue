<template>
  <h1 style="text-align: center">INVENTORY LISTS</h1>
  <br />
  <hr />
  <br />

  <div>
    <ul>
      <li class="card" v-for="it in list" :key="it.id">
        <div>
          <h2>{{ it.name }}</h2>
          <br />
          <p>{{ it.note }}</p>
          <br />
          <p>Number of Items: {{ it.len || 0 }}</p>
        </div>
        <div>
          <el-link
            :href="'/main/item/' + it.id"
            type="success"
            :underline="false"
            >view</el-link
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import fire from '@/firebase'
import { ref, toRefs, onMounted } from 'vue'

export default {
  setup () {
    const list = ref([])
    const itemslist = ref([])

    const getList = async (params) => {
      var find = await fire.db.collection("inventorys")
        .get()
      list.value = []
      find.forEach(function (doc) {
        list.value.push({ ...doc.data(), id: doc.id })
      });

      var itemfind = await fire.db.collection("items")
        .get()
      itemslist.value = []
      itemfind.forEach(function (doc) {
        itemslist.value.push({ ...doc.data(), id: doc.id })
      });

      list.value = list.value.map((it, index) => {
        var ites = itemslist.value.filter((item, index) => item.inventoryid == it.id)
        it.len = ites.length
        return it
      })
    }
    onMounted(() => {
      getList()
    })

    return {
      list
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 28px;
  margin: 10px 0;
  border: 1px solid #eee;
}
</style>