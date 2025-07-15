<template>
  <div class="relative cursor-pointer">
    <div tabindex="0" class="avatar relative aspect-square rounded-full flex items-center justify-center" :class="'size-' + size">
      <img v-if="image" :src="image" alt="Profile image" class="w-full h-full object-cover" />
      <span v-else-if="!image" class="avatar-label font-semibold uppercase">{{ fallback }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    size: {
      type: String,
      default: 'md',
    },
    image: String,
    fallback: String,
  },
};
</script>

<style scoped>
.avatar {
  outline-style: solid;
  outline-width: 1px;
  outline-offset: 0px;
  transition-property: outline-width, outline-color;
  transition-duration: 300ms;
  transition-timing-function: ease;
}

/* States */
.avatar {
  background-color: var(--grey--50);
  color: var(--grey--900);
  outline-color: transparent;
}

.avatar:hover {
  outline-color: rgba(103, 110, 118, 0.08);
}

.avatar:focus {
  outline-width: 4px;
  outline-color: rgba(103, 110, 118, 0.16);
}

/* Sizes */
.avatar.size-xs {
  height: 24px;
}

.avatar.size-xs .avatar-label {
  font-size: 10px;
  line-height: 8px;
}

.avatar.size-sm {
  height: 32px;
}

.avatar.size-sm .avatar-label {
  font-size: 14px;
  line-height: 12px;
}

.avatar.size-md {
  height: 40px;
}

.avatar.size-md .avatar-label {
  font-size: 1rem;
  line-height: 12px;
}

.avatar.size-lg {
  height: 48px;
}

.avatar.size-lg .avatar-label {
  font-size: 1.25rem;
  line-height: 15px;
}

.avatar.size-xl {
  height: 56px;
}

.avatar.size-xl .avatar-label {
  font-size: 1.5rem;
  line-height: 18px;
}

.avatar.size-2xl {
  height: 64px;
}

.avatar.size-2xl .avatar-label {
  font-size: 1.75rem;
  line-height: 21px;
}
</style>
