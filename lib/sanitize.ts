/**
 * Sanitize user input to prevent XSS attacks.
 * Escapes HTML special characters.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validate and sanitize query parameters for API requests.
 */
export function sanitizeQueryParams(
  params: Record<string, string | string[] | undefined>
): Record<string, string> {
  const sanitized: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      sanitized[sanitizeInput(key)] = sanitizeInput(value);
    }
  }
  return sanitized;
}
