<template>
  <el-container style="height: 100vh">
    <el-aside width="320px" style="height: 100%; background: #545c64">
      <div class="info logo">Market Keeper</div>
      <div class="info name">{{ user.username }}</div>
      <br />
      <br />
      <el-menu
        :uniqueOpened="true"
        :default-active="rkey"
        :active="rkey"
        class="el-menu-vertical-demo"
        @select="handleselect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#43a492"
        router
      >
        <el-menu-item index="/main/inventory"
          >View Inventory Lists</el-menu-item
        >
        <el-menu-item v-if="user.type == 2" index="/main/postInventory"
          >+ Create New List</el-menu-item
        >
        <el-menu-item v-if="user.type == 2" index="/main/team"
          >Team</el-menu-item
        >
      </el-menu>
      <br />
      <br />
      <div class="btns">
        <el-button style="width: 100%" type="info" @click="logout"
          >Sign Out</el-button
        >
      </div>
    </el-aside>

    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'


export default defineComponent({
  setup () {
    var user = JSON.parse(localStorage.getItem('user') || '{}')

    var router = useRouter()
    var rkey = ref()

    var handleselect = (key, keyPath) => {
      rkey.value = key
    }
    var logout = () => {
      localStorage.clear();
      router.push('/login')
    }

    onMounted(() => {
      rkey.value = location.pathname == '/main' ? '/main/inventory' : location.pathname
    })

    watch(location, (newval, oldval) => {
      console.log('oldval -> :', oldval)
      console.log('newval -> :', newval)

    })

    return {
      handleselect,
      logout,
      rkey,
      user
    };



  },
});
</script>

<style scoped>
.main {
  max-height: 100vh;
  margin-left: 10px;
}
.el-menu-vertical-demo {
  border: none;
}
.btns {
  width: 80%;
  margin: 0 auto;
}
.info {
  text-align: center;
  color: #fff;
}
.logo {
  font-size: 24px;
  font-weight: 600;
  line-height: 120px;
}
</style>