import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  });

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <div className="mb-5 text-center">
        Do You really want to delete{" "}
        <span className="text-pink">{productInfo?.title}</span> ?
      </div>
      <div className="flex items-center justify-center gap-3">
        <button className="text-sm btn" onClick={deleteProduct}>
          Yes
        </button>
        <button className="text-sm btn" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
