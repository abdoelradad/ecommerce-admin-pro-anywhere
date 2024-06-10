import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="mb-5 text-xl text-white">New Product</h1>
      <ProductForm />
    </Layout>
  );
}
