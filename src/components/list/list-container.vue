<template>
  <div class="list-container w-full flex flex-col rounded-lg outline-2 outline-solid">
    <slot name="item" />
  </div>
</template>

<script>
export default {
  name: 'list-container',
};
</script>

<style scoped>
.list-container {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
}
</style>
