import { submitOrder } from "./src/actions/order";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function test() {
  console.log("Testing submitOrder...");
  const res = await submitOrder({
    fullName: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    city: "Test City",
    orderType: "personal",
    variant: "oceanic",
    quantity: 1
  });
  console.log("Result:", res);
}

test();
