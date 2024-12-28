
<script setup lang="ts">
    import Logo from '../assets/images/logo_phoenix.png'
</script>


<template>
  <div>
      <header>
        <div>
          <img :src="Logo" alt="LOGO">
        </div>
      </header>
      <RouterView/>
  </div>
</template>

<style lang="scss" src="./_style.scss">

</style>
