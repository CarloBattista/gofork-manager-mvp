<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumb-list flex flex-wrap gap-2 items-center">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item flex-none" :class="{ 'is-active': index === items.length - 1 }">
        <router-link v-if="item.to && index !== items.length - 1" :to="item.to" class="breadcrumb-link flex gap-2 items-center">
          <component v-if="!onlyText && item.icon" class="breadcrumb-icon" :is="item.icon"></component>
          <span v-if="!onlyIcon" class="text-sm ellipsis-text md:block hidden">{{ item.label }}</span>
        </router-link>
        <span v-else class="breadcrumb-text flex gap-2 items-center">
          <component v-if="!onlyText && item.icon" class="breadcrumb-icon" :is="item.icon"></component>
          <span v-if="!onlyIcon" class="text-sm ellipsis-text md:block hidden">{{ item.label }}</span>
        </span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator ml-1 flex-none" aria-hidden="true">
          <ChevronRight size="12" stroke-width="3" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
// ICONS
import { House, ShoppingCart, ChevronRight } from 'lucide-vue-next';

export default {
  name: 'breadcrumbs',
  components: {
    // ICONS
    House,
    ShoppingCart,
    ChevronRight,
  },
  props: {
    items: {
      type: Array,
      default: () => [
        {
          label: 'Home',
          to: '/',
          icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
        },
        { label: 'Pagina corrente' },
      ],
    },
    onlyIcon: Boolean,
    onlyText: Boolean,
  },
};
</script>

<style scoped>
.breadcrumbs {
  padding: 0.75rem 0;
  font-size: 0.875rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: var(--grey--500);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: #374151;
  text-decoration: underline;
}

.breadcrumb-text {
  color: var(--grey--500);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.breadcrumb-item.is-active .breadcrumb-text {
  color: var(--primary---black);
  font-weight: 600;
}

.breadcrumb-icon {
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.breadcrumb-icon svg {
  width: 100%;
  height: 100%;
}

.breadcrumb-separator svg {
  color: var(--grey--500);
}
</style>
