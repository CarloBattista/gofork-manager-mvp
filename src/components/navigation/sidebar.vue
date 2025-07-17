<template>
  <div
    class="fixed z-[9999] top-0 left-0 min-w-[74px] max-w-60 h-svh lg:px-5 px-3 py-[22px] border-r border-solid border-black/10 bg-white"
    :class="{ 'w-min max-w-[74px]': !store.sidebar.isOpen, 'w-full': store.sidebar.isOpen }"
  >
    <div class="w-full h-full flex flex-col gap-6">
      <div class="w-full h-full flex flex-col justify-start">
        <RouterLink to="/dashboard" class="max-w-[120px]">
          <logo type="full" logo="manager" class="lg:block hidden" />
          <logo type="min" class="lg:hidden block" />
        </RouterLink>
        <div class="w-full mt-16 flex flex-col gap-1">
          <tooltip position="right" content="Dashboard" :disabled="!isMobile" class="w-full">
            <template #trigger>
              <RouterLink to="/dashboard">
                <navItem icon="House" label="Home" />
              </RouterLink>
            </template>
          </tooltip>
          <tooltip position="right" content="Sala" :disabled="!isMobile" class="w-full">
            <template #trigger>
              <RouterLink to="/rooms">
                <navItem icon="Armchair" label="Sala" />
              </RouterLink>
            </template>
          </tooltip>
          <tooltip position="right" content="Prenotazioni" :disabled="!isMobile" class="w-full">
            <template #trigger>
              <RouterLink to="/bookings">
                <navItem icon="CalendarDays" label="Prenotazioni" />
              </RouterLink>
            </template>
          </tooltip>
        </div>
      </div>
      <div class="w-full flex flex-col justify-end">
        <tooltip position="right" content="Impostazioni" :disabled="!isMobile" class="w-full">
          <template #trigger>
            <RouterLink to="/settings">
              <navItem icon="Settings" label="Impostazioni" />
            </RouterLink>
          </template>
        </tooltip>
        <tooltip position="right" content="Esci" :disabled="!isMobile" class="w-full">
          <template #trigger>
            <navItem @click="actionSignout" icon="DoorOpen" label="Esci" />
          </template>
        </tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';

import logo from '../global/logo.vue';
import navItem from './nav-item.vue';
import tooltip from '../tooltip/tooltip.vue';

export default {
  name: 'sidebar',
  components: {
    logo,
    navItem,
    tooltip,
  },
  data() {
    return {
      auth,
      store,
      isMobile: false,
    };
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 1024) {
        this.store.sidebar.isOpen = false;
        this.isMobile = true;
      } else {
        this.store.sidebar.isOpen = true;
        this.isMobile = false;
      }
    },

    async actionSignout() {
      if (confirm('Sei sicuro di voler uscire?')) {
        try {
          const { error } = await supabase.auth.signOut();

          if (!error) {
            this.auth.user = null;
            this.auth.session = null;
            this.auth.profile = null;
            this.auth.isAuthenticated = false;

            localStorage.removeItem('isAuthenticated');
            this.$router.push({ name: 'signin' });
          }
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped></style>
