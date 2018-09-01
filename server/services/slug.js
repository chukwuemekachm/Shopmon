const randomString = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @description Creates a slug from the business name provided
 *
 * @param {String} businessName The name of the business
 *
 * @returns {String} The slug created
 */
const createSlug = async (businessName) => {
  const result = businessName.trim().toLowerCase();
  let random = '';
  while (random.length < 11) {
    random += randomString[Math.floor((Math.random() * 61) + 0)];
  }
  const businessNameSlug = await `${result}-${random}`.replace(/[\W_]+/g, '-');
  return businessNameSlug;
};

/**
 * @description Generates a random String
 *
 * @returns {String} The random string
 */
const randomGenerator = () => {
  let string = '';
  while (string.length < 9) {
    string += randomString[Math.floor((Math.random() * 61) + 0)];
  }
  return string;
};

export const generateString = randomGenerator;
export default createSlug;
