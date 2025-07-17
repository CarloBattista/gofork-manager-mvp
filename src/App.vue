<template>
  <div>
    <RouterView @load-profile="getProfile" />
  </div>
</template>

<script>
import { supabase } from './lib/supabase';
import { auth } from './data/auth';
import { store } from './data/store';

export default {
  name: 'App',
  data() {
    return {
      auth,
      store,
    };
  },
  methods: {
    async getUser() {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (!error) {
          // console.log(data);

          this.auth.user = data.user;
          this.auth.isAuthenticated = true;

          localStorage.setItem('isAuthenticated', true);

          this.getSession();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getSession() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!error) {
          // console.log(data);
          this.auth.session = data.session;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getProfile() {
      if (!this.auth.user?.id) return;

      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('user_id', this.auth.user.id).maybeSingle();

        if (!error) {
          // console.log(data);
          this.auth.profile = data;
        }
      } catch (e) {
        console.error(e);
      }
    },

    async getRestaurantProfile() {
      this.store.restaurants.loading = true;

      const PROFILE_USER_ID = this.auth.profile?.id;

      if (!PROFILE_USER_ID) {
        this.store.restaurants.loading = false;
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profile_restaurants')
          .select('*, restaurants(*)')
          .eq('profile_id', PROFILE_USER_ID)
          .maybeSingle();

        if (!error) {
          // console.log(data)
          this.store.restaurants.data = data;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.store.restaurants.loading = false;
      }
    },
  },
  watch: {
    'auth.user': {
      handler(value) {
        if (value) {
          this.getSession();
          this.getProfile();
        }
      },
      deep: true,
    },
    'auth.profile': {
      handler(value) {
        if (value) {
          this.getRestaurantProfile();
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped></style>
