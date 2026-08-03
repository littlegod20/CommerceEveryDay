import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

// Next.js expands $VAR references when loading .env files, so a raw bcrypt
// hash (full of "$") gets silently corrupted unless every "$" is escaped.
// Print the pre-escaped form so it's safe to paste straight into .env.local.
const escaped = hash.replaceAll("$", "\\$");

console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
