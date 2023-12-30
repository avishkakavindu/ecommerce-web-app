import { EncryptStorage } from 'encrypt-storage';

export const ENCRYPTED_HASH = 'k6GAdP*UkDF*%$$Q2r7muFaSv#nUOgysHO@$qSjz1gz&sxtwpbJ0*CQrGxg';

export const encryptedLocalStorage = new EncryptStorage(ENCRYPTED_HASH, {
  prefix: '@portal_uy1',
  storageType: 'localStorage',
});

/**
 * Store the access token in local storage.
 * @param {string} token - The access token to store.
 */
export const storeAccessToken = (token: string) =>
  encryptedLocalStorage.setItem('accessToken', token);

/**
 * Store the refresh token in local storage.
 * @param {string} token - The refresh token to store.
 */
export const storeRefreshToken = (token: string) =>
  encryptedLocalStorage.setItem('refreshToken', token);

/**
 * Get the access token from local storage.
 * @returns {string | null} The access token.
 */
export const getAccessToken = (): string | null | undefined =>
  encryptedLocalStorage.getItem('accessToken');

/**
 * Get the refresh token from local storage.
 * @returns {string | null} The refresh token.
 */
export const getRefreshToken = (): string | null | undefined =>
  encryptedLocalStorage.getItem('refreshToken');
