<template>
  <div>
    <h1>users</h1>
    <br />
    <hr />
    <br />
    <div>
      <p>Current Select User : {{ currentRow.username }}</p>
      <el-table
        ref="singleTable"
        :data="users"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            Item Names:
            <p v-for="it in props.row.itemsinfo" :key="it.id">
              {{ it.name }}
            </p>
          </template>
        </el-table-column>

        <el-table-column type="index" label="index" width="250">
        </el-table-column>
        <el-table-column prop="username" label="username"> </el-table-column>
        <el-table-column label="type"> user </el-table-column>
      </el-table>
    </div>
  </div>
  <br />
  <div>
    <h1>items</h1>
    <br />
    <hr />
    <br />
    <div>
      <el-table
        ref="multipleTable"
        :data="items"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="item name" prop="name"> </el-table-column>
        <el-table-column prop="quantity" label="item quantity">
          <template #default="scope">
            {{ scope.row.quantity }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <div>
    <el-button type="primary" @click="save">submit</el-button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import fire from '@/firebase'

export default {
  setup () {
    var users = ref([])
    var multipleTable = ref(null)
    var items = ref([])
    var currentRow = ref({})
    var multipleSelection = ref([])


    var handleCurrentChange = (val) => {
      var obj = { ...val }
      currentRow.value = obj;
      if (obj.itemsinfo.length) {
        obj.itemsinfo.forEach(row => {
          multipleTable.value.toggleRowSelection(row);
        });
      } else {
        multipleTable.value.clearSelection();
      }
    }

    var handleSelectionChange = (val) => {
      multipleSelection.value = val;
    }

    var save = async () => {
      if (!currentRow.value.username) {
        alert('Please select the User')
        return
      }

      var its = multipleSelection.value.map((it, index) => it.id)
      var old = currentRow.value.items
      var newArr = [...its]

      currentRow.value.items = [...new Set(newArr)]
      delete currentRow.value.itemsinfo

      var update = await fire.db.collection("users").doc(currentRow.value.id)
        .set({ ...currentRow.value })

      if (!update) {
        alert('successfully')
        localStorage.clear()
        window.location.href = '/'
      }
    }

    var getList = async () => {
      var finds = await fire.db.collection("users")
        .get()
      users.value = []
      finds.forEach(function (doc) {
        users.value.push({ ...doc.data(), id: doc.id })
      });


      var itemfinds = await fire.db.collection("items")
        .get()
      items.value = []
      itemfinds.forEach(function (doc) {
        items.value.push({ ...doc.data(), id: doc.id })
      });

      var typeUser = users.value.filter(it => it.type == 1)
      typeUser = typeUser.map((it, index) => {
        it.itemsinfo = it.items.map((item, index) => {
          return items.value.find(it => it.id == item) || []
        })
        return it
      })

      users.value = typeUser
    }
    onMounted(() => {
      getList()
    })


    return {
      users,
      currentRow,

      items,
      multipleSelection,
      multipleTable,

      handleCurrentChange,
      handleSelectionChange,
      save,
    }
  }
}
</script>

<style  scoped>
</style>