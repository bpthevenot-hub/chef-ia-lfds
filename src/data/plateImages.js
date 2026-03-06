/* ═══════════════════════════════════════════════════════════ */
/*  PLATE IMAGES — AI-generated dish photos                    */
/*                                                             */
/*  COMMENT AJOUTER VOS IMAGES :                               */
/*  1. Créez vos images avec ChatGPT                           */
/*  2. Placez-les dans /public/plates/                         */
/*  3. Ajoutez l'entrée dans PLATE_IMAGES ci-dessous           */
/*                                                             */
/*  FORMAT DES CLÉS :                                          */
/*  {catégorie}_{cuisson}_{sauce}_{dressage}                   */
/*                                                             */
/*  Le système cherche du plus spécifique au plus général :     */
/*  1. viande_medium-rare_classic_gourmet  (combo complet)     */
/*  2. viande_medium-rare_gourmet          (sans sauce)        */
/*  3. viande_gourmet                      (catégorie+style)   */
/*  4. viande                              (catégorie seule)   */
/* ═══════════════════════════════════════════════════════════ */

// Fallback images (Unsplash) — used when no custom image is available
const FALLBACK = {
  viande: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop&q=90',
  poisson: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a5?w=800&h=600&fit=crop&q=90',
  legumes: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=90',
  default: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&q=90',
};

// ── Custom plate images ──
// Uncomment and add paths as you create images with ChatGPT.
// Images go in /public/plates/ and paths start with /plates/
const PLATE_IMAGES = {
  // ── Catégorie seule (fallback basique) ──
  // 'viande': '/plates/viande.jpg',
  // 'poisson': '/plates/poisson.jpg',
  // 'legumes': '/plates/legumes.jpg',

  // ── Catégorie + Style de dressage ──
  // 'viande_brasserie': '/plates/viande_brasserie.jpg',
  // 'viande_gourmet': '/plates/viande_gourmet.jpg',
  // 'viande_rustic': '/plates/viande_rustic.jpg',
  // 'poisson_brasserie': '/plates/poisson_brasserie.jpg',
  // 'poisson_gourmet': '/plates/poisson_gourmet.jpg',
  // 'poisson_rustic': '/plates/poisson_rustic.jpg',
  // 'legumes_brasserie': '/plates/legumes_brasserie.jpg',
  // 'legumes_gourmet': '/plates/legumes_gourmet.jpg',
  // 'legumes_rustic': '/plates/legumes_rustic.jpg',

  // ── Catégorie + Cuisson + Style ──
  // 'viande_rare_brasserie': '/plates/viande_rare_brasserie.jpg',
  // 'viande_medium-rare_gourmet': '/plates/viande_medium-rare_gourmet.jpg',
  // 'viande_medium_rustic': '/plates/viande_medium_rustic.jpg',
  // 'viande_well-done_brasserie': '/plates/viande_well-done_brasserie.jpg',

  // ── Combo complet (Catégorie + Cuisson + Sauce + Style) ──
  // 'viande_rare_light_brasserie': '/plates/viande_rare_light_brasserie.jpg',
  // 'viande_medium-rare_classic_gourmet': '/plates/viande_medium-rare_classic_gourmet.jpg',
  // 'viande_medium_generous_rustic': '/plates/viande_medium_generous_rustic.jpg',
};

/**
 * Resolve the best matching plate image for the user's selections.
 * Tries from most specific to least specific key, then falls back to Unsplash.
 */
export function getPlateImage(state) {
  const { category, cookingLevel, sauceLevel, platingStyle } = state;
  const cooking = cookingLevel || 'default';
  const sauce = sauceLevel || 'classic';
  const plating = platingStyle || 'brasserie';

  // Try keys from most specific to least
  const keys = [
    `${category}_${cooking}_${sauce}_${plating}`,
    `${category}_${cooking}_${plating}`,
    `${category}_${plating}`,
    category,
  ];

  for (const key of keys) {
    if (PLATE_IMAGES[key]) return PLATE_IMAGES[key];
  }

  // Fallback to stock photo
  return FALLBACK[category] || FALLBACK.default;
}
