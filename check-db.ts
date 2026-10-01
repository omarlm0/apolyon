import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const rows = await sql`SELECT id, full_name, email, phone, city, variant, quantity, order_ref, status, created_at FROM orders ORDER BY created_at DESC`;
  console.log('\n=== ORDERS TABLE ===');
  console.log(`Total orders: ${rows.length}\n`);
  if (rows.length === 0) {
    console.log('No orders found in the database.');
  } else {
    rows.forEach((row) => {
      console.log(`#${row.order_ref} | ${row.full_name} | ${row.email} | ${row.phone} | ${row.city} | ${row.variant} | Qty: ${row.quantity} | Status: ${row.status} | ${row.created_at}`);
    });
  }
}

main().catch(console.error);
