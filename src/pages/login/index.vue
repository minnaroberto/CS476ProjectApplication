<template>
  <Top />

  <div class="form">
    <h3>Login</h3>
    <br />
    <el-form label-width="180px" :model="formLabelAlign">
      <el-form-item label="username">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Top from 'comps/Top.vue'
import { ref, reactive } from 'vue'
import fire from '@/firebase'
import { useRouter } from 'vue-router'


export default {
  components: {
    Top
  },
  setup () {
    var router = useRouter()

    var formLabelAlign = reactive({
      username: '',
      password: '',
    })
    var onSubmit = async () => {
      var { username, password, } = formLabelAlign
      username = username.trim()
      password = password.trim()

      if (!username || !password) {
        alert('Parameter cannot be empty')
        return
      }

      var find = await fire.db.collection("users")
        .where("username", "==", username)
        .where("password", "==", password)
        .get()

      if (find.empty) {
        alert('User does not exist. Please register')
        return
      }
      find.forEach(function (doc) {
        var user = { ...doc.data(), id: doc.id }
        console.log('user -> :', user)
        router.push('/main')
        localStorage.setItem('user', JSON.stringify(user))
      });

    }

    return {
      formLabelAlign,
      onSubmit
    }
  }
}
</script>

<style  scoped>
.form {
  width: 420px;
  margin: 0 auto;
}
.form h3 {
  text-align: center;
}
</style>