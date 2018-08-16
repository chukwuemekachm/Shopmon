module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Businesses', [
    {
      name: 'test business',
      slug: 'test-business-u9uue8u838',
      address: 'No. 56 Ogui Road, Enugu.',
      description: 'Test Business is a test business for seeding data on Shopmon',
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
    {
      name: 'second test business',
      slug: 'test-business-u9uue8u88h',
      address: 'No. 78 Agbani Road, Enugu.',
      description: 'Second Test Business is a test business for seeding data on Shopmon',
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Businesses', null, {}),
};
