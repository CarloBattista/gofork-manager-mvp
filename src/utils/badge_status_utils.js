/**
 * Mapping degli status delle prenotazioni alle variant dei badge
 */
const STATUS_VARIANT_MAP = {
  // Status confermati
  confermata: 'success',
  confirmed: 'success',
  attiva: 'success',
  active: 'success',

  // Status in attesa
  in_attesa: 'warning',
  pending: 'warning',
  da_confermare: 'warning',
  waiting: 'warning',

  // Status cancellati/errori
  cancellata: 'error',
  cancelled: 'error',
  annullata: 'error',
  rifiutata: 'error',
  rejected: 'error',

  // Status completati
  completata: 'primary',
  completed: 'primary',
  terminata: 'primary',
  finished: 'primary',
};

/**
 * Traduzione degli status in italiano
 */
const STATUS_LABELS = {
  confirmed: 'Confermata',
  pending: 'In attesa',
  cancelled: 'Cancellata',
  completed: 'Completata',
  active: 'Attiva',
  waiting: 'Da confermare',
  rejected: 'Rifiutata',
  finished: 'Terminata',

  // Già in italiano
  confermata: 'Confermata',
  in_attesa: 'In attesa',
  cancellata: 'Cancellata',
  completata: 'Completata',
  attiva: 'Attiva',
  da_confermare: 'Da confermare',
  annullata: 'Annullata',
  rifiutata: 'Rifiutata',
  terminata: 'Terminata',
};

/**
 * Restituisce la variant del badge basata sullo status
 * @param {string} status - Lo status della prenotazione
 * @returns {string} La variant del badge (success, warning, error, primary)
 */
export function getStatusVariant(status) {
  if (!status) return 'primary';

  const normalizedStatus = status.toLowerCase().trim();
  return STATUS_VARIANT_MAP[normalizedStatus] || 'primary';
}

/**
 * Restituisce il label tradotto in italiano per lo status
 * @param {string} status - Lo status della prenotazione
 * @returns {string} Il label tradotto in italiano
 */
export function getStatusLabel(status) {
  if (!status) return 'Sconosciuto';

  const normalizedStatus = status.toLowerCase().trim();
  return STATUS_LABELS[normalizedStatus] || status;
}

/**
 * Restituisce un oggetto con variant e label per il badge
 * @param {string} status - Lo status della prenotazione
 * @returns {object} Oggetto con variant e label
 */
export function getStatusBadgeProps(status) {
  return {
    variant: getStatusVariant(status),
    label: getStatusLabel(status),
  };
}

/**
 * Lista di tutte le variant disponibili per i badge
 */
export const BADGE_VARIANTS = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

/**
 * Lista di tutte le size disponibili per i badge
 */
export const BADGE_SIZES = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
};

/**
 * Lista di tutti i tipi disponibili per i badge
 */
export const BADGE_TYPES = {
  SIMPLE: 'simple',
  DOT: 'dot',
  ICONS: 'icons',
};
