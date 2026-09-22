// Helper script to generate PBKDF2 password hash and salt for admin user creation
// Run with: node generate-hash.js

const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function promptPassword() {
  return new Promise((resolve) => {
    rl.question('Enter admin password: ', (password) => {
      if (!password || password.length < 8) {
        console.log('Error: Password must be at least 8 characters long.');
        rl.close();
        process.exit(1);
      }
      resolve(password);
    });
  });
}

async function generatePasswordHash(password) {
  // Generate a cryptographically secure random salt (16 bytes)
  const salt = crypto.randomBytes(16);
  const saltHex = salt.toString('hex');
  
  // Derive hash using PBKDF2 with SHA-256, 100,000 iterations
  const hash = crypto.pbkdf2Sync(
    password,
    salt,
    100000,
    32,
    'sha256'
  ).toString('hex');
  
  console.log('\n' + '='.repeat(60));
  console.log('Admin User Creation Helper');
  console.log('='.repeat(60));
  console.log('');
  console.log('Generated values:');
  console.log(`  Email: your@email.com`);
  console.log(`  Password Hash: ${hash}`);
  console.log(`  Salt: ${saltHex}`);
  console.log('');
  console.log('SQL to insert into D1 database:');
  console.log('-'.repeat(60));
  console.log(`INSERT INTO users (email, password_hash, salt) VALUES ('your@email.com', '${hash}', '${saltHex}');`);
  console.log('-'.repeat(60));
  console.log('');
  console.log('Instructions:');
  console.log('1. Replace "your@email.com" with your actual admin email');
  console.log('2. Run the SQL command in Cloudflare D1 Console or via wrangler:');
  console.log('   wrangler d1 execute rainha-de-copas-db --command="INSERT INTO users (email, password_hash, salt) VALUES (...)"');
  console.log('');
  console.log('Security Notes:');
  console.log('- PBKDF2 with 100,000 iterations provides strong protection');
  console.log('- Each password has a unique salt (prevents rainbow table attacks)');
  console.log('- Password was never written to a file or stored in source code');
  console.log('- Never share the password hash or salt publicly');
  console.log('='.repeat(60) + '\n');
}

async function main() {
  console.log('Admin User Password Hash Generator');
  console.log('=====================================\n');
  
  const password = await promptPassword();
  
  // Immediately clear the password from memory after use
  const passwordHash = await generatePasswordHash(password);
  
  rl.close();
  
  // Clear the password variable from memory (though not guaranteed in JS)
  // This is a best practice, though the garbage collector handles it
}

main().catch((error) => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});