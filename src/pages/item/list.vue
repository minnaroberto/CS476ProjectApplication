
<template>
  <div>
    <div class="top">
      <h1>{{ inventory.name }}</h1>
      <el-link
        v-if="user.type == 2"
        :href="'/main/postInventory/' + inventory.id"
        type="success"
        :underline="false"
        >edit</el-link
      >
    </div>
    <br />
    <hr />
    <br />
    <div>
      <p>Description: {{ inventory.note }}</p>
      <p>{{ itemList.length }} Total Items</p>
    </div>

    <div class="btns" v-if="user.type == 2">
      <el-link
        :href="'/main/postItem/' + inventory.id"
        type="success"
        :underline="false"
        >Add Item</el-link
      >
      &nbsp; &nbsp;
      <el-button type="danger" @click="dels()">Remove Items</el-button>
    </div>
    <br />
    <div v-show="selectItem.id">
      <p>select item : {{ selectItem.name }}</p>
      <br />
      <p>
        <el-button @click="eddNumber">abatement Number</el-button>
        &nbsp;
        <el-input-number
          v-model="number"
          controls-position="right"
          :min="0"
        ></el-input-number>
        &nbsp;
        <el-button @click="addNumber">add Number</el-button>
      </p>
    </div>
    <br />

    <el-table
      ref="multipleTable"
      :data="itemList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="item name" prop="name"> </el-table-column>
      <el-table-column prop="quantity" label="item quantity">
        <template #default="scope">
          <span v-if="user.type == 2">
            {{ scope.row.quantity }}
            &nbsp;
            <el-button @click="() => changeNumber(scope.row)"
              >change number</el-button
            >
          </span>
          <span v-else-if="user.type == 1 && user.items.includes(scope.row.id)">
            {{ scope.row.quantity }}
            &nbsp;
            <el-button @click="() => changeNumber(scope.row)"
              >change number</el-button
            >
          </span>
          <span v-else>
            {{ scope.row.quantity }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="action" v-if="user.type == 2">
        <template #default="scope">
          <el-link
            :href="'/main/postItem/' + inventory.id + '/' + scope.row.id"
            type="success"
            :underline="false"
            >edit</el-link
          >
          &nbsp; &nbsp;
          <el-button type="danger" @click="() => del(scope.row.id)"
            >del</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import fire from '@/firebase'


export default {
  setup () {
    var user = JSON.parse(localStorage.getItem('user') || '{}')
    var tableData = ref([{
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-08',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-06',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }, {
      date: '2016-05-07',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }])
    var multipleSelection = ref([])
    var selectItem = ref({})
    var multipleTable = ref([])
    var number = ref(0)
    var { inventoryid } = useRoute().params



    var handleSelectionChange = (val) => {
      multipleSelection.value = val;
    }

    var dels = async () => {
      if (!multipleSelection.value.length) {
        alert('please select items');
        return
      }
      if (window.confirm('Do you want to delete these data')) {
        multipleSelection.value.map(async (it) => {
          await fire.db.collection("items").doc(it.id)
            .delete()
        })
        setTimeout(() => {
          alert('successfully')
          getList()
        }, 800)
      }
    }
    var del = async (id) => {
      if (window.confirm('Do you want to delete these data')) {
        var update = await fire.db.collection("items").doc(id)
          .delete()
        if (!update) {
          alert('successfully')
          getList()
        }
      }
    }

    var changeNumber = (row) => {
      selectItem.value = row
    }

    var eddNumber = async (row) => {
      var newval = Number(selectItem.value.quantity) - Number(number.value)
      //   selectItem.value.quantity = newval
      if (newval < 0) {
        alert('Quantity cannot be less than 0')
        return
      }

      var upda = await fire.db.collection('items').doc(selectItem.value.id).update({
        quantity: newval
      })
      if (!upda) {
        alert('successfully')
        location.reload()
      }
    }

    var addNumber = async (row) => {
      var newval = Number(selectItem.value.quantity) + Number(number.value)
      //   selectItem.value.quantity = newval

      var upda = await fire.db.collection('items').doc(selectItem.value.id).update({
        quantity: newval
      })
      if (!upda) {
        alert('successfully')
        location.reload()
      }
    }



    var info = reactive({
      inventory: {
      }
    })
    var itemList = ref([])
    var getList = async () => {
      var find = await fire.db.collection("inventorys").doc(inventoryid)
        .get()
      info.inventory = { ...find.data(), id: find.id }

      var finds = await fire.db.collection("items")
        .where('inventoryid', '==', inventoryid)
        .get()
      itemList.value = []
      finds.forEach(function (doc) {
        itemList.value.push({ ...doc.data(), id: doc.id })
      });
    }
    onMounted(() => {
      getList()
    })


    return {
      ...toRefs(info),
      itemList,
      tableData,
      multipleSelection,
      multipleTable,
      selectItem,
      number,
      handleSelectionChange,
      dels,
      del,
      changeNumber,
      eddNumber,
      addNumber,

      user,
    }
  }
}
</script>

<style  scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.btns {
  text-align: right;
}
</style>