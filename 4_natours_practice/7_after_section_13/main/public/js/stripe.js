import axios from 'axios';
import Stripe from 'stripe';
import { showAlert } from './alert';

const stripe = new Stripe(
  'pk_test_51MwT7dSImzrDY3RQeTQt64guUB8A4AN3ew3nfOO02OkztmuVOqMIypne7qrZgR39oAwVpLwwj8wRfRpjPZnz6fmj00rY9AJ5vM'
);



export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};