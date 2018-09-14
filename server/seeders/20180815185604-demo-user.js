const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      username: 'johnny',
      email: 'johnny@gmail.com',
      businessSlug: 'test-business-u9uue8u838',
      role: 'user',
      position: 'owner',
      password: bcrypt.hashSync('Password123', 10),
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
      password: bcrypt.hashSync('Password123', 10),
      verified: true,
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
    {
      username: 'drille',
      email: 'drille@test.com',
      businessSlug: 'test-business-u9uue8u88h',
      role: 'user',
      position: 'employee',
      password: bcrypt.hashSync('Password123', 10),
      verified: true,
      createdAt: 'NOW()',
      updatedAt: 'NOW()',
    },
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
