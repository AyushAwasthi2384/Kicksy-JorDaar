import { getKey, makePayment } from "../../api/payment.api";
import { baseURL } from "../../api/auth.api";

const PaymentButton = (props) => {
  const amount = props.amount * 100;
  const checkOutHandler = async () => {
    const key = await getKey();
    const order = await makePayment({ amount });
    console.log(order);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Ankit Gupta",
      description: "Razorpay tutorial",
      image: "",
      order_id: order.id,
      callback_url: `${baseURL}/user/payments/verify-payment`,
      prefill: {
        name: "Ankit Gupta",
        email: "guptankit0522@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "abcdefghijkl",
      },
      theme: {
        color: "#000000",
      },
    };
    const razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return <button onClick={checkOutHandler}>Pay Now</button>;
};

export default PaymentButton;