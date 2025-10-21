<template>
  <div>
    <el-button type="success">Click me</el-button>
    <el-input v-model="name" placeholder="Your name" />
    <div class="text-color bottom-2 px-4 flex items-center justify-center">
      sdfdsfsf
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const name = ref('');
</script>

<style lang="scss">
.text-color {
  color: red
}

</style>