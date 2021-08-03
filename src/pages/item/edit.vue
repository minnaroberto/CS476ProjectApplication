<template>
  <div class="form">
    <h3>POST ITEM</h3>
    <br />
    <el-form label-width="180px" :model="formLabelAlign">
      <el-form-item label="item Name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>

      <el-form-item label="item Quantity">
        <el-input-number
          v-model="formLabelAlign.quantity"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import fire from '@/firebase'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup () {
    var router = useRouter()
    var { inventoryid, itemid } = useRoute().params

    var formLabelAlign = reactive({
      name: '',
      quantity: '',
    })

    var save = async () => {
      var { name, quantity, } = formLabelAlign
      name = name.trim()

      if (!name) {
        alert('Parameter cannot be empty')
        return
      }

      var data = {
        name,
        quantity,
        inventoryid,
      }
      console.log('data -> :', data)

      if (itemid) {
        var findData = await fire.db.collection("items").doc(itemid)
          .get()
        if (!findData.exists) {
          alert('item already exists, do not add repeatedly')
          return
        }

        var update = await fire.db.collection("items").doc(itemid)
          .set({ ...data })
        if (!update) {
          alert('successfully')
          router.push('/main/item/' + inventoryid)
        }
      } else {
        var find = await fire.db.collection("items")
          .where("name", "==", name)
          .get()
        if (!find.empty) {
          alert('item already exists, do not add repeatedly')
          return
        }
        var insert = await fire.db.collection("items")
          .add({ ...data })

        if (insert.id) {
          alert('item was added successfully')
          formLabelAlign.name = ''
          formLabelAlign.note = ''
          router.push('/main/item/' + inventoryid)
        }
      }
    }


    var getData = async () => {
      var find = await fire.db.collection("items").doc(itemid)
        .get()
      var obj = { ...find.data(), id: find.id }
      formLabelAlign.name = obj.name
      formLabelAlign.quantity = obj.quantity
    }

    onMounted(() => {
      if (itemid) {
        getData()
      }
    })

    return {
      formLabelAlign,
      save
    }
  }
}
</script>

<style  scoped>
.form {
  width: 60%;
}
</style>