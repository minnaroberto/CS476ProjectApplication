<template>
  <Top />
  <div class="main">
    <p>Manage and keep track of food and drink items in your store</p>
    <p>Create as many lists as you want to categorize your products</p>
    <p>Easily change the quantity of your products</p>
    <p>
      <img src="./img/logo.png" />
    </p>
    <p>Want to get started? Create an account here:</p>
    <p><router-link to="/reg">Create an account</router-link></p>
    <p>Already have an account? Login here:</p>
    <p><router-link to="/login">Login</router-link></p>
  </div>
</template>

<script setup>
import Top from 'comps/Top.vue'
</script>

<style  scoped>
.main {
  text-align: center;
  font-size: 22px;
  font-weight: 500;
}
.main img {
  width: 360px;
  height: 160px;
}
.main p {
  margin: 16px 0;
}
</style>