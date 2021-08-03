<template>
  <div class="form">
    <h3>POST INVENTORY</h3>
    <br />
    <el-form label-width="180px" :model="formLabelAlign">
      <el-form-item label="inventory Name">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>

      <el-form-item label="inventory Note">
        <el-input v-model="formLabelAlign.note"></el-input>
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
    var { inventoryid } = useRoute().params

    var formLabelAlign = reactive({
      name: '',
      note: '',
    })

    var save = async () => {
      var { name, note, } = formLabelAlign
      name = name.trim()
      note = note.trim()

      if (!name) {
        alert('Parameter cannot be empty')
        return
      }

      var data = {
        name,
        note,
      }
      console.log('data -> :', data)

      if (inventoryid) {
        var findData = await fire.db.collection("inventorys").doc(inventoryid)
          .get()
        if (!findData.exists) {
          alert('Inventory already exists, do not add repeatedly')
          return
        }

        var update = await fire.db.collection("inventorys").doc(inventoryid)
          .set({ ...data })
        if (!update) {
          alert('successfully')
        }
      } else {
        var find = await fire.db.collection("inventorys")
          .where("name", "==", name)
          .get()
        if (!find.empty) {
          alert('Inventory already exists, do not add repeatedly')
          return
        }
        var insert = await fire.db.collection("inventorys")
          .add({ ...data })

        if (insert.id) {
          alert('Inventory was added successfully')
          formLabelAlign.name = ''
          formLabelAlign.note = ''
          router.push('/main/inventory')
        }
      }
    }


    var getData = async () => {
      var find = await fire.db.collection("inventorys").doc(inventoryid)
        .get()
      var obj = { ...find.data(), id: find.id }
      formLabelAlign.name = obj.name
      formLabelAlign.note = obj.note
    }

    onMounted(() => {
      if (inventoryid) {
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