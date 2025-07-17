<template>
  <div
    tabindex="0"
    class="nav-item relative w-full h-11 max-h-11 p-2.5 rounded-lg flex gap-2 items-center lg:justify-start justify-center cursor-pointer"
  >
    <div v-if="icon" class="nav-icon h-full max-w-5 max-h-5 flex items-center justify-center">
      <component :is="icon" />
    </div>
    <span v-if="label" class="nav-label text-base font-medium lg:block hidden">{{ label }}</span>
  </div>
</template>

<script>
// ICONS
import { House, Armchair, CalendarDays, Settings, DoorOpen } from 'lucide-vue-next';

export default {
  name: 'nav-item',
  components: {
    // ICONS
    House,
    Armchair,
    CalendarDays,
    Settings,
    DoorOpen,
  },
  props: {
    icon: {
      type: String,
      default: 'House',
    },
    label: String,
  },
};
</script>

<style scoped>
.nav-item {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  outline-color: transparent;
  cursor: pointer;

  color: var(--grey--400);

  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.nav-item:hover {
  outline-color: rgba(103, 110, 118, 0.16);
  background-color: var(--primary---white);
  color: var(--primary---black);
}

.router-link-active .nav-item {
  cursor: default;
  background-color: var(--primary---black);
  color: var(--primary---white);
}
</style>
