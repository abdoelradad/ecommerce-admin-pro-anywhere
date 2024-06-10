import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// icons
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <Layout>
      <Link
        href={"/products/new"}
        className="flex items-center gap-2 w-fit btn"
      >
        <span>
          <IoIosAddCircle className="mt-[2px] text-2xl text-white" />
        </span>
        <span>Add product</span>
      </Link>

      <table className="mt-2 basic">
        <thead>
          <tr>
            <td>Products</td>
            <td>Controls</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{product.title}</td>
                <td>
                  <Link
                    href={"/products/edit/" + product._id}
                    className="flex items-center text-xs md:text-sm"
                  >
                    <FaRegEdit />
                    <span className="hidden md:flex">Edit</span>
                  </Link>
                  <Link
                    href={"/products/delete/" + product._id}
                    className="flex items-center text-xs md:text-sm"
                  >
                    <FaRegTrashAlt />
                    <span className="hidden mt-2 md:mt-0 md:flex">Delete</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}
