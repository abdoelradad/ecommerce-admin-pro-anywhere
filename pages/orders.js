import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => setOrders(response.data));
  }, []);
  return (
    <Layout>
      <h1>Orders</h1>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Date</td>
            <td>Recipent</td>
            <td>Products</td>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order}>
                <td>{order.createdAt}</td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode}
                  {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data.name} x {l.quantity}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
