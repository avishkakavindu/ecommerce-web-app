import axios from 'axios';

/**
 * Function to fetch image data
 * @param {string} imageLocation
 * @param {string} accessToken
 * @param {string} refreshToken
 * @returns
 */
export const fetchImage = async (imageLocation, accessToken, refreshToken) => {
  try {
    // TODO get base url dynamically
    const response = await fetch(`http://localhost:4000/${imageLocation}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh': refreshToken,
      },
    });

    if (!response.ok) {
      throw new Error('Image download failed');
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
