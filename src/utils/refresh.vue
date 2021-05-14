<template>
<div></div>
</template>

<script>
/* eslint-disable */
export default {
beforeRouteEnter(to, from, next)  {
 next(vm => {
  vm.$router.replace(from.path);
 })
}
}
</script>

<style>

</style>