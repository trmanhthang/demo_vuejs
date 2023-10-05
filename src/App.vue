<template>
  <div>
    <HeaderComponent/>
    <router-view/>
  </div>
</template>

<script>

import HeaderComponent from "@/components/Header.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>

<style>
:root {

}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: 'Arial', sans-serif;
  font-size: 1.6rem;
  line-height: 1.5;
  color: #666;
}

td, th {
  text-align: center;
  padding: 10px 8px;
}

td {
  border-top:1px solid #f0f0f0;
  border-bottom:1px solid #f0f0f0;
}

th {
  color: #ACACAC;
}

table {
  border-collapse:collapse;
  width: 100%;
}

input {
  padding: 8px 16px;
  border-radius: 48px;
  outline: none;
  border: 1px solid #888;
  font-size: 1.6rem;
  color: #000;
}

a {
  text-decoration: none;
  color: #000;
}
</style>
