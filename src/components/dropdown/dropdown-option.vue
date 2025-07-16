<template>
  <div
    tabindex="0"
    class="dpd-option w-full h-12 max-h-12 px-4 py-3 rounded-lg flex gap-2 items-center"
    :class="{ 'dpd-option--selected': selected === data }"
  >
    <h2 class="text-sm font-medium ellipsis-text">
      <b>{{ data?.dial_code }}</b> {{ data?.name }}
    </h2>
  </div>
</template>

<script>
export default {
  name: 'dropdown-option',
  props: {
    data: Object,
    selected: Object,
  },
};
</script>

<style scoped>
.dpd-option {
  position: relative;
  z-index: 1;
  outline: transparent;
  outline-style: solid;
  cursor: pointer;
  outline-width: 1px;
  outline-offset: 0px;
  border-radius: 8px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.dpd-option {
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.dpd-option:hover {
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.dpd-option:focus {
  z-index: 2;
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

/* Selected */
.dpd-option.dpd-option--selected {
  background-color: var(--primary---black);
  color: var(--primary---white);
}
</style>
