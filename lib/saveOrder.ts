// src/lib/saveOrder.ts
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function saveOrder(user: any, cart: any[], shipping: number = 0) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal ;

  const orderData = {
    userId: user.uid,
    customer: {
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
    items: cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      shipping: shipping,
    })),
    subtotal,
    total,
    status: "pending",
    createAt: Timestamp.now(),
    updateAt: Timestamp.now(),
  };

  return await addDoc(collection(db, "orders"), orderData);
}
