import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, role, restaurantName, restaurantId, apiKey, frontendUrl, inviteToken } = await req.json();

    // Validazione dei dati
    if (!email || !firstName || !lastName || !role || !inviteToken) {
      return new Response(JSON.stringify({ error: 'Dati mancanti' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = apiKey;

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY non fornita');
    }

    const emailData = {
      from: 'onboarding@resend.dev',
      to: [email],
      subject: `Invito a unirsi a ${restaurantName || 'il nostro ristorante'}`,
      html: `
        <h2>Ciao ${firstName} ${lastName}!</h2>
        <p>Sei stato invitato a unirti al nostro team come <strong>${role}</strong>.</p>
        <p>Clicca sul link qui sotto per completare la registrazione:</p>
        <a href="${frontendUrl}/signup?token=${encodeURIComponent(inviteToken)}">Completa la registrazione</a>
        <p>Questo invito scadrà tra 7 giorni.</p>
        <p>Benvenuto nel team!</p>
      `,
    };

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Errore invio email: ${error}`);
    }

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, messageId: result.id }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
