<template>
  <Top />

  <div class="form">
    <h3>Register</h3>
    <br />
    <el-form label-width="180px" :model="formLabelAlign">
      <el-form-item label="username">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item label="repeat password">
        <el-input v-model="formLabelAlign.repassword"></el-input>
      </el-form-item>
      <el-form-item label="role type">
        <el-radio-group v-model="formLabelAlign.type">
          <el-radio label="1">user</el-radio>
          <el-radio label="2">admin</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Top from 'comps/Top.vue'
import { ref, reactive } from 'vue'
import fire from '@/firebase'

export default {
  components: {
    Top
  },
  setup () {

    var formLabelAlign = reactive({
      username: '',
      password: '',
      repassword: '',
      type: '1'
    })
    var onSubmit = async () => {
      var { username, password, repassword, type } = formLabelAlign
      username = username.trim()
      password = password.trim()
      repassword = repassword.trim()

      if (!username || !password || !repassword) {
        alert('Parameter cannot be empty')
        return
      }
      if (password !== repassword) {
        alert('Two unequal passwords')
        return
      }
      var data = {
        username,
        password,
        type
      }
      if (type == 1) {
        data.items = []
      }
      var find = await fire.db.collection("users")
        .where("username", "==", username)
        .where("password", "==", password)
        .get()
      if (!find.empty) {
        alert('User already exists Please sign in')
        return
      }
      var insert = await fire.db.collection("users")
        .add({ ...data })

      if (insert.id) {
        alert('Sign login please Sign login')
      }
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