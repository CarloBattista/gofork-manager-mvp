<template>
  <sidebar />
  <mainView size="sm">
    <template #view>
      <headTitle :backTo="true" :actions="true" head="Gestione del team">
        <template #actions>
          <RouterLink to="/members/invite">
            <buttonLg type="button" size="md" variant="primary" label="invita membro nel team" />
          </RouterLink>
        </template>
      </headTitle>
      <div class="w-full my-4">
        <searchInput v-model="search.query" @input="onSearchInput" placeholder="Cerca per email" class="ml-auto max-w-[250px]" />
      </div>
      <listContainer>
        <template #item>
          <listItem
            v-for="(member, memberIndex) in filteredMembers"
            :key="memberIndex"
            icon="UserRound"
            :head="member.profiles?.email"
            :description="member.role"
          >
            <template #badge>
              <badge v-if="member.profiles?.id === auth.profile?.id" type="simple" variant="primary" size="sm" label="Tu" />
            </template>
            <template #actions>
              <bulletSimple :state="getStateMember(member.profiles?.status)" :label="getStatusMember(member.profiles?.status)" />
            </template>
          </listItem>
        </template>
      </listContainer>
      <div v-if="search.query && filteredMembers.length === 0" class="w-full flex flex-col items-center justify-center">
        <svg width="205" height="200" viewBox="0 0 205 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M95.57 21.156a.811.811 0 0 1 .9-.713c16 1.873 28.546 5.78 37.118 10.828 8.548 5.033 13.306 11.309 13.306 17.947 0 3.376-1.592 6.572-4.245 9.374-2.653 2.801-6.407 5.253-10.853 7.173-5.612 2.422-12.381 4.02-19.559 4.385 1.704 3.29 2.14 6.144 1.598 8.52-.598 2.616-2.348 4.505-4.562 5.672-2.204 1.162-4.894 1.628-7.494 1.424a.812.812 0 0 1 .127-1.62c2.34.184 4.717-.243 6.611-1.242 1.885-.994 3.265-2.533 3.737-4.597.464-2.034.078-4.718-1.827-8.091a60.273 60.273 0 0 1-11.059-.773c-10.764-1.77-19.91-5.233-26.159-8.997-3.12-1.88-5.555-3.858-7.103-5.772-1.525-1.885-2.321-3.883-1.74-5.704l.004-.01c.582-1.736 2.286-2.875 4.468-3.464 2.208-.596 5.08-.686 8.345-.189 6.54.996 14.81 4.366 22.835 11.056 5.496 4.58 9.128 8.648 11.317 12.2 7.291-.27 14.174-1.853 19.819-4.29 4.304-1.859 7.855-4.2 10.318-6.8 2.463-2.6 3.8-5.416 3.8-8.255 0-5.792-4.165-11.635-12.505-16.546-8.316-4.897-20.624-8.758-36.485-10.615a.812.812 0 0 1-.712-.901Zm13.864 47.448c-2.113-3.17-5.468-6.837-10.453-10.992-7.819-6.517-15.818-9.75-22.042-10.698-3.116-.474-5.75-.37-7.68.151-1.952.527-3.018 1.425-3.35 2.406-.325 1.028.05 2.441 1.457 4.18 1.387 1.714 3.65 3.577 6.68 5.402 6.047 3.644 14.993 7.045 25.585 8.787 3.285.54 6.576.782 9.803.764Z"
            fill="#000"
          ></path>
          <path
            d="M92.671 110.019H47.334L37.012 99.221a1.514 1.514 0 0 1-.294-1.642 1.533 1.533 0 0 1 1.402-.917h39.945a4.38 4.38 0 0 1 3.153 1.354l11.453 12.003ZM108.596 132.648h60.694c.445 0 .881-.12 1.262-.349.381-.229.691-.558.897-.95a2.4 2.4 0 0 0-.165-2.502l-13.253-18.829h-65.36l15.925 22.63Z"
            fill="#000"
          ></path>
          <path
            d="M112.619 110.473h44.664V175.6c0 .464-.186.909-.517 1.238-.331.329-.78.514-1.25.514h-42.897v-66.879Z"
            fill="#fff"
            stroke="#000"
            stroke-width="0.91"
          ></path>
          <path
            d="M130.529 118.035h8.846c1.843 0 3.336 1.477 3.336 3.3v.005c0 1.822-1.493 3.299-3.336 3.299h-8.846c-1.842 0-3.336-1.477-3.336-3.299v-.005c0-1.823 1.494-3.3 3.336-3.3ZM47.028 110.018h65.36v67.789H49.813c-.74 0-1.45-.292-1.973-.812a2.76 2.76 0 0 1-.817-1.96v-65.003l.005-.014Z"
            fill="#000"
          ></path>
          <path
            d="M167.097 96.661h-39.836a4.982 4.982 0 0 0-3.598 1.54l-11.276 11.818h45.351l10.417-10.911a1.44 1.44 0 0 0 .283-1.57 1.463 1.463 0 0 0-1.341-.877Z"
            fill="#000"
          ></path>
          <path
            d="M94.105 132.041H35.6a1.745 1.745 0 0 1-1.54-.928 1.707 1.707 0 0 1 .114-1.778l13.167-18.701h63.875L97.311 130.38v.001a3.91 3.91 0 0 1-3.206 1.66Z"
            fill="#fff"
            stroke="#000"
            stroke-width="1.213"
          ></path>
        </svg>
        <h2 class="mb-4 text-2xl font-semibold">Nessun risultato</h2>
        <buttonLg @click="clearSearch" type="button" size="md" variant="secondary-color" label="Rimuovi tutti i filtri" />
      </div>
    </template>
  </mainView>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';

import sidebar from '../../components/navigation/sidebar.vue';
import mainView from '../../components/global/main-view.vue';
import headTitle from '../../components/head/head-title.vue';
import buttonLg from '../../components/button/button-lg.vue';
import searchInput from '../../components/input/search-input.vue';
import listContainer from '../../components/list/list-container.vue';
import listItem from '../../components/list/list-item.vue';
import badge from '../../components/badge/badge.vue';
import bulletSimple from '../../components/bullet/bullet-simple.vue';

export default {
  name: 'Members',
  components: {
    sidebar,
    mainView,
    headTitle,
    buttonLg,
    searchInput,
    listContainer,
    listItem,
    badge,
    bulletSimple,
  },
  data() {
    return {
      auth,
      store,

      members: {
        data: null,
        error: null,
        loading: false,
      },
      search: {
        query: '',
        searchTimeout: null,
        loading: false,
      },
    };
  },
  computed: {
    filteredMembers() {
      if (!this.members.data) return [];
      if (!this.search.query) return this.members.data;

      return this.members.data.filter(
        (member) => member.profiles && member.profiles.email && member.profiles.email.toLowerCase().includes(this.search.query.toLowerCase())
      );
    },
  },
  methods: {
    getStateMember(status) {
      if (status === 'active') {
        return 'success';
      } else if (status === 'not_active') {
        return 'primary';
      } else if (status === 'invited') {
        return 'warning';
      } else if (status === 'expired') {
        return 'error';
      }

      return status;
    },
    getStatusMember(status) {
      if (status === 'active') {
        return 'Attivo';
      } else if (status === 'not_active') {
        return 'Non attivo';
      } else if (status === 'invited') {
        return 'Invitato';
      } else if (status === 'expired') {
        return 'Scaduto';
      }

      return status;
    },
    clearSearch() {
      this.search.query = '';
      this.getMembers();
    },
    onSearchInput() {
      // Se la query è vuota, ricarica tutti i membri
      if (!this.search.query.trim()) {
        this.getMembers();
        return;
      }

      if (this.search.searchTimeout) {
        clearTimeout(this.search.searchTimeout);
      }

      this.search.searchTimeout = setTimeout(() => {
        this.searchMembers();
      }, 400);
    },

    async getMembers() {
      this.members.loading = true;

      const restaurantId = this.store.restaurants.data.restaurant_id;

      try {
        const { data, error } = await supabase.from('profile_restaurants').select('*, profiles(*)').eq('restaurant_id', restaurantId);

        if (!error) {
          this.members.data = data;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.members.loading = false;
      }
    },
    async searchMembers() {
      this.search.loading = true;

      const restaurantId = this.store.restaurants.data.restaurant_id;

      try {
        const { data, error } = await supabase
          .from('profile_restaurants')
          .select('*, profiles(*)')
          .eq('restaurant_id', restaurantId)
          .ilike('profiles.email', `%${this.search.query}%`);

        if (!error) {
          console.log(data);
          this.members.data = data;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.search.loading = false;
      }
    },
  },
  watch: {
    'store.restaurants.data': {
      handler(value) {
        if (value) {
          this.getMembers();
        }
      },
      deep: true,
    },
  },
  mounted() {
    if (this.store.restaurants.data) {
      this.getMembers();
    }
  },
};
</script>

<style scoped></style>
