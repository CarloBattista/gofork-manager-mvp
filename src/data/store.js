import { reactive } from 'vue';

export const store = reactive({
  sidebar: {
    isOpen: true,
  },

  modals: {
    member_edit: {
      isOpen: false,
      data: {},
      error: {},
      loading: false,
    },
  },
  roles: [
    {
      value: 'manager',
      icon: 'ShieldUser',
      head: 'Manager',
      description: 'Può gestire il ristorante visualizzare tutti i dati',
    },
    {
      value: 'staff',
      icon: 'ChefHat',
      head: 'Staff',
      description: 'Può gestire prenotazioni, sale e tavoli',
    },
  ],
  restaurants: {
    data: null,
    error: null,
    loading: false,
  },
});
