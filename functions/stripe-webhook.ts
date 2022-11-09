import { Request, Response } from 'express'
import { stripe } from './_utils/stripe'

interface NhostRequest extends Request {
  rawBody: string
}

const endpointSecret = 'whsec_3aa2b8ef2a1261fecdc9c69a0b4ffba2427b0c4a8f05e6785ae6a9ff6ad12836'

const handler = (req: NhostRequest, res: Response) => {
  const sig = req.headers['stripe-signature'] as string

  let event

  console.log('raw body')
  console.log(req.rawBody)

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret)
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`)
    console.log(err)

    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (!event) {
    console.log('no event found')
    console.log(event)
    return res.status(400).send('No event')
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
    case 'customer.created':
      const customerCreated = event.data.object
      console.log('customer created!')
      console.log(event.data.object)

      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a res to acknowledge receipt of the event
  res.json({ received: true })
}

export default handler
