module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      username: 'johnny',
      email: 'johnny@gmail.com',
      businessSlug: 'test-business-u9uue8u838',
      role: 'user',
      position: 'owner',
      verified: false,
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
    {
      username: 'bobby',
      email: 'user@test.com',
      businessSlug: 'test-business-u9uue8u838',
      role: 'user',
      position: 'employee',
      verified: true,
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
