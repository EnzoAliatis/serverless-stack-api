import stripePackage from 'stripe';
import { calculateCost } from './libs/billing-lib';
import { success, failture } from './libs/response-lib';

export async function main(event, context) {
  const { storage, source } = JSON.parse(event.body);

  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripe = stripePackage(process.env.stripeScretKey);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd'
    });
    return success({ status: true });
  } catch (e) {
    return failture({ message: e.message });
  }
}