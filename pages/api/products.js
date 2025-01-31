import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { authOptions, isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res, authOptions);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const { title, description, price, images, category, properties } =
      req.body;
    const productDoc = await Product.create({
      title,
      description,
      price,
      category,
      images,
      properties,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const { title, description, price, images, _id, properties, category } =
      req.body;
    await Product.updateOne(
      { _id },
      { title, description, price, category, images, properties }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
