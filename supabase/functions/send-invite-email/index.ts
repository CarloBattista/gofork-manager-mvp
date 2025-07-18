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
    const { email, firstName, lastName, role, restaurantName, restaurantId, frontendUrl, inviteToken } = await req.json();

    // Validazione dei dati
    if (!email || !firstName || !lastName || !role || !inviteToken) {
      return new Response(JSON.stringify({ error: 'Dati mancanti' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Ottieni la chiave API dalle variabili d'ambiente
    const resendApiKey = Deno.env.get('RESEND_API_KEY');

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY non configurata nelle variabili d\'ambiente');
    }

    // Ottieni l'email mittente e l'URL frontend dalle variabili d'ambiente (opzionali)
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';
    const baseUrl = frontendUrl || Deno.env.get('FRONTEND_URL') || 'http://localhost:5173';

    const emailData = {
      from: fromEmail,
      to: [email],
      subject: `Invito a unirsi a ${restaurantName || 'il nostro ristorante'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Ciao ${firstName} ${lastName}!</h2>
          <p style="color: #666; line-height: 1.6;">Sei stato invitato a unirti al nostro team come <strong>${role}</strong> presso <strong>${restaurantName || 'il nostro ristorante'}</strong>.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <a href="${baseUrl}/signup?token=${encodeURIComponent(inviteToken)}" 
               style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Completa la registrazione
            </a>
          </div>
          
          <p style="color: #666; line-height: 1.6;">Questo invito scadrà tra 7 giorni.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">Benvenuto nel team!</p>
          </div>
        </div>
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

    return new Response(JSON.stringify({ success: true, messageId: result.id }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error('Errore nella funzione send-invite-email:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
