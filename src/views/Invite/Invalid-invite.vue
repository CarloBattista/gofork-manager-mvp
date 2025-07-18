<template>
  <div class="w-full">
    <div class="max-w-[450px] mx-auto md:px-7 px-4 pt-28">
      <div class="w-full mb-16 flex items-center justify-center">
        <logo type="full" logo="manager" class="max-w-[140px]" />
      </div>
      <div class="w-full mb-8 flex flex-col gap-4 text-center">
        <h2 class="text-3xl font-semibold text-gray-900">Link di invito non valido</h2>
        <div class="text-sm font-normal text-gray-600 space-y-2">
          <p class="text-balance">Il link di invito che hai utilizzato non è più valido. Questo può accadere se:</p>
          <ul class="text-left space-y-1 mt-4">
            <li>• Il link è già stato utilizzato</li>
            <li>• Il link è scaduto</li>
            <li>• Il link è stato modificato</li>
          </ul>
        </div>
      </div>

      <div class="w-full flex flex-col gap-4">
        <RouterLink to="/signin">
          <buttonLg type="button" size="md" variant="primary" label="Hai già un account? Accedi" class="w-full" />
        </RouterLink>
      </div>

      <div class="w-full mt-8 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm text-blue-800">
          <strong>Hai bisogno di aiuto?</strong><br />
          Contatta la persona che ti ha inviato l'invito per richiedere un nuovo link.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../components/global/logo.vue';
import buttonLg from '../../components/button/button-lg.vue';

export default {
  name: 'Invalid-invite',
  components: {
    logo,
    buttonLg,
  },
};
</script>

<style scoped></style>
