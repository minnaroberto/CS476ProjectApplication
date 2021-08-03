<template>
  <div class="top">
    <h1>Market Keeper</h1>
    <div class="top-login">
      <el-link href="/reg" type="success" :underline="false">Sign Up</el-link>
      &nbsp; &nbsp;
      <el-link href="/login" type="success" :underline="false">Login</el-link>
    </div>
  </div>
</template>

<style scoped>
.top h1 {
  height: 140px;
  line-height: 140px;
  text-align: center;
  color: #fff;
  background: #43a492;
}
.top-login {
  text-align: right;
  margin-top: -60px;
  margin-right: 60px;
  padding: 30px 0;
}
.top-login a {
  color: #fff;
}
</style>