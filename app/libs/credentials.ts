/**
 * Genera un token aleatorio de 40 caracteres hexadecimales.
 *
 * Esta función utiliza la API crypto para generar valores aleatorios criptográficamente seguros.
 * Crea un array de 20 bytes y lo convierte a una cadena hexadecimal.
 *
 * @returns {string} Token aleatorio de 40 caracteres hexadecimales
 *
 * @example
 * const token = generateRandomToken();
 * // Retorna algo como: "a1b2c3d4e5f6g7h8i9j0..."
 */
export function generateRandomToken(): string {
  const array = new Uint8Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Genera un hash SHA-256 de una cadena de entrada.
 *
 * Convierte la cadena de entrada a bytes usando TextEncoder y genera
 * un hash SHA-256, retornando el resultado como una cadena hexadecimal.
 *
 * @param {string} inputValue - Valor de entrada para generar el hash
 * @returns {Promise<string>} Hash SHA-256 en formato hexadecimal
 *
 * @example
 * const hash = await generateRandomString("mi texto");
 * // Retorna el hash SHA-256 del texto
 */
export function generateRandomString(inputValue: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputValue);
  return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  });
}

/**
 * Genera un hash SHA-256 de una contraseña.
 *
 * Utiliza TextEncoder para convertir la contraseña a bytes y genera
 * un hash SHA-256, devolviendo el resultado como una cadena hexadecimal.
 *
 * @param {string} password - Contraseña a hashear
 * @returns {Promise<string>} Hash SHA-256 de la contraseña en formato hexadecimal
 *
 * @example
 * const hashedPassword = await hashPassword("miContraseña123");
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Compara una contraseña con su hash almacenado.
 *
 * Genera el hash de la contraseña proporcionada y lo compara con
 * el hash almacenado para verificar si coinciden.
 *
 * @param {string} password - Contraseña a verificar
 * @param {string} hash - Hash almacenado para comparar
 * @returns {Promise<boolean>} true si la contraseña coincide, false en caso contrario
 *
 * @example
 * const isMatch = await comparePassword("miContraseña123", hashAlmacenado);
 * if (isMatch) {
 *   // Contraseña correcta
 * }
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}
