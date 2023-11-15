// const dollarsToCents = require("dollars-to-cents");
// // const { Order } = require("../model");
// // const {
// //   createUserConfirmationOrderEmail,
// //   createAdminConfirmationOrderEmail,
// // } = require("./mail.controller");

// // const { sum } = require("ramda");

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const createPaymentIntent = async ({ body: { amount } }, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: dollarsToCents(amount),
//       currency: "eur",
//       payment_method_types: ["card"],
//     });

//     return res.status(200).send(paymentIntent);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // const createPaymentIntent = async (
// //   { body: { fullname, address, phone, email, products } },
// //   res
// // ) => {
// //   try {
// //     if (!address) {
// //       throw new Error("Адрес обязателен");
// //     }

// //     const amount = sum(products.map((i) => Number(i.price)));

// //     const productsIds = products.map(({ _id }) => _id);

// //     const prepareOrder = {
// //       fullname,
// //       address,
// //       phone,
// //       email,
// //       products: productsIds,
// //       amount,
// //     };

// //     const newOrder = await new Order(prepareOrder);
// //     const saveOrder = await newOrder.save();

// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: dollarsToCents(amount),
// //       currency: "eur",
// //       payment_method_types: ["card"],
// //       metadata: {
// //         orderId: String(saveOrder._id),
// //       },
// //     });

// //     return res.status(200).send({
// //       paymentIntent,
// //       saveOrder,
// //     });
// //   } catch (err) {
// //     res.status(500).send(err);
// //   }
// // };

// const stripeWebHook = async ({ body: { data } }, res) => {
//   try {
//     const {
//       metadata: { orderId },
//     } = data.object;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       throw new Error("Order not found");
//     }

//     await Order.findByIdAndUpdate(orderId, { status: "Paid" });
//     createUserConfirmationOrderEmail(order);
//     createAdminConfirmationOrderEmail(order);
//     return res.status(200).send("success");
//   } catch (err) {
//     console.log(err, "ERROR");
//     res.status(500).send(err);
//   }
// };

// module.exports = {
//   createPaymentIntent,
//   stripeWebHook,
// };
