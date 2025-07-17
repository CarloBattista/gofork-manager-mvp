<template>
  <div class="bullet-simple flex gap-1 items-center" :class="'state-' + state">
    <div class="dot relative h-2 aspect-square rounded-full"></div>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'bullet-simple',
  props: {
    state: {
      type: String,
      default: 'success',
    },
    label: String,
  },
};
</script>

<style scoped>
.bullet-simple.state-primary {
  color: var(--primary---black);
}

.bullet-simple.state-primary .dot {
  background-color: var(--primary---black);
}

.bullet-simple.state-error {
  color: var(--error--700);
}

.bullet-simple.state-error .dot {
  background-color: var(--error--700);
}

.bullet-simple.state-warning {
  color: var(--warning--700);
}

.bullet-simple.state-warning .dot {
  background-color: var(--warning--700);
}

.bullet-simple.state-success {
  color: var(--success--700);
}

.bullet-simple.state-success .dot {
  background-color: var(--success--700);
}
</style>
