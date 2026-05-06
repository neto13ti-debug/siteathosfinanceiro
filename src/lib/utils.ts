/**
 * Limpa uma string para ser usada como slug em URLs
 */
export const cleanSlug = (slug: string) => {
  if (!slug) return 'noticia-sem-link';
  return slug
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '')       // Remove caracteres especiais como $, %, , ()
    .replace(/\s+/g, '-')           // Troca espaços por traços
    .replace(/-+/g, '-');           // Remove traços duplos
};
