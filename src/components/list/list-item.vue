<template>
  <div
    class="list--item w-full px-4 py-3 flex gap-4 rounded-lg items-center justify-between cursor-pointer"
    :class="{ 'list--item-selected': selected }"
  >
    <div class="flex gap-4 items-center justify-start">
      <div v-if="icon" class="h-full aspect-square flex items-center justify-center">
        <component :is="icon" />
      </div>
      <div class="flex flex-col gap-1">
        <h2 class="text-base font-medium flex gap-2 items-center">
          <span v-if="head">{{ head }}</span>
          <slot name="badge" />
        </h2>
        <p v-if="description" class="text-sm font-normal">{{ description }}</p>
      </div>
    </div>
    <div class="flex items-center justify-end">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import badge from '../../components/badge/badge.vue';
import bulletSimple from '../../components/bullet/bullet-simple.vue';

// ICONS
import { UserRound, ShieldUser, ChefHat, Sparkle } from 'lucide-vue-next';

export default {
  name: 'list-item',
  components: {
    badge,
    bulletSimple,

    // ICONS
    UserRound,
    ShieldUser,
    ChefHat,
    Sparkle,
  },
  props: {
    selected: Boolean,
    icon: String,
    head: String,
    description: String,
  },
};
</script>

<style scoped>
.list--item {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  outline-color: transparent;

  transition-property: background-color, color, opacity, transform, outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

.list--item:hover {
  background-color: rgba(103, 110, 118, 0.16);
}

.list--item.list--item-selected {
  outline-width: 4px;
  outline-color: var(--primary---black);
  background-color: rgba(103, 110, 118, 0.16);
}
</style>
