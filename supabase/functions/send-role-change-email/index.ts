import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function getRoleLabel(role: string): string {
  switch (role) {
    case 'manager':
      return 'Manager';
    case 'staff':
      return 'Staff';
    case 'owner':
      return 'Proprietario';
    default:
      return role;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email, firstName, lastName, oldRole, newRole, restaurantName } = await req.json();

    // Validazione dei dati
    if (!email || !firstName || !lastName || !oldRole || !newRole) {
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

    // Ottieni l'email mittente dalle variabili d'ambiente (opzionale)
    const fromEmail = Deno.env.get('FROM_EMAIL') || 'onboarding@resend.dev';

    const oldRoleLabel = getRoleLabel(oldRole);
    const newRoleLabel = getRoleLabel(newRole);

    const emailData = {
      from: fromEmail,
      to: [email],
      subject: `Aggiornamento del tuo ruolo in ${restaurantName || 'il nostro ristorante'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Ciao ${firstName} ${lastName}!</h2>
          <p style="color: #666; line-height: 1.6;">Ti informiamo che il tuo ruolo in <strong>${restaurantName || 'il nostro ristorante'}</strong> è stato aggiornato.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
            <p style="margin: 0 0 10px 0;"><strong>Ruolo precedente:</strong> <span style="color: #dc3545;">${oldRoleLabel}</span></p>
            <p style="margin: 0;"><strong>Nuovo ruolo:</strong> <span style="color: #28a745;">${newRoleLabel}</span></p>
          </div>
          
          <p style="color: #666; line-height: 1.6;">Questo cambiamento è effettivo da ora. Se hai domande riguardo alle tue nuove responsabilità, non esitare a contattare il tuo manager.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px; margin: 0;">Grazie per essere parte del nostro team!</p>
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
    console.error('Errore nella funzione send-role-change-email:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});