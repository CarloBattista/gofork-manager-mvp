<template>
  <td :class="{ relative: !isFirst, isFixed: isFirst }">
    <div v-if="!inner && label" class="text-black text-sm font-normal ellipsis-text">{{ label }}</div>
    <slot v-else-if="inner" name="inner" />
  </td>
</template>

<script>
export default {
  name: 'table-cell',
  props: {
    isFirst: {
      type: Boolean,
      default: false,
    },
    inner: {
      type: Boolean,
      default: false,
    },
    label: String,
  },
};
</script>

<style scoped>
.isFixed {
  position: relative;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  background-color: transparent;
}

.isFixed::after {
  position: absolute;
  top: 0;
  left: 100%;
  width: 6px;
  height: 100%;
  content: '';
  background: transparent;
}

@media only screen and (max-width: 768px) {
  .isFixed {
    position: sticky;
    background-color: white;
  }

  .isFixed::after {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.12), hsla(0, 0%, 100%, 0));
  }
}
</style>
