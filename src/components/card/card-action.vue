<template>
  <div tabindex="0" class="card-action w-full h-full p-3 rounded-lg cursor-pointer">
    <div class="w-full h-full flex flex-col items-center justify-around gap-2">
      <div v-if="icon" class="relative h-12 aspect-square flex items-center justify-center">
        <component :is="icon" size="36" />
      </div>
      <p v-if="label" class="text-lg font-semibold text-center">{{ label }}</p>
    </div>
  </div>
</template>

<script>
// ICONS
import { CalendarPlus, CopyPlus, UserPlus } from 'lucide-vue-next';

export default {
  name: 'card-action',
  components: {
    // ICONS
    CalendarPlus,
    CopyPlus,
    UserPlus,
  },
  props: {
    icon: String,
    label: String,
  },
};
</script>

<style scoped>
.card-action {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.card-action {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.card-action:hover {
  outline-color: rgba(0, 0, 0, 0.64);
  background-color: var(--grey--100);
  color: var(--primary---black);
}

.card-action:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}
</style>
