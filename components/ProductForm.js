/* eslint-disable @next/next/no-img-element */

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { RxCross2 } from "react-icons/rx";
export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: assignedProperties,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  // states to get data from from
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    assignedProperties || {}
  );
  const [description, setDecription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const router = useRouter();
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/category").then((result) => {
      setCategories(result.data);
    });
  }, []);

  // create the product
  async function saveProduct(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = {
      title,
      description,
      price,
      images,
      category,
      properties: productProperties,
    };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  // uploading images
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImages) => [...oldImages, ...res.data.links]);
          })
        );
      }

      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
    } else {
      return "An error Occurred";
    }
  }

  if (goToProducts) {
    router.push("/products");
  }

  function updateImagesOrder(Images) {
    setImages(Images);
  }

  function handleDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);

    propertiesToFill.push(...catInfo.properties);

    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }

  return (
    <>
      <form onSubmit={saveProduct} className="pl-3">
        {/* first row (title) */}
        <label>Product Name</label>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Product Name"
        />
        {/* Category */}
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">none</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
        </select>

        {/* props */}
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p) => (
            <div className="flex flex-col gap-1" key={p.name}>
              <div className="capitalize ">{p.name}</div>
              <select
                value={productProperties[p.name]}
                onChange={(ev) => setProductProp(p.name, ev.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}

        {/* photos */}
        <label>Photos</label>
        <div className="relative flex items-center gap-3 mb-2">
          <label className="flex flex-col items-center justify-center w-24 h-24 my-1 border border-gray-500 cursor-pointer">
            <FaCloudUploadAlt className="text-4xl text-gray-400" />
            <span className="text-sm text-gray-400">Upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadImages}
              className="hidden"
            />
          </label>
          {!images?.length && (
            <div className="text-sm">No Photos in this product</div>
          )}
          <div className="absolute rotate-90 left-5 top-5">
            {isUploading && <Spinner />}
          </div>
          {!isUploading && (
            <div className="">
              <ReactSortable
                list={Array.isArray(images) ? images : []}
                setList={updateImagesOrder}
                animation={200}
                className="flex items-center gap-1"
              >
                {Array.isArray(images) &&
                  images.map((link, index) => (
                    <div key={link} className="relative group">
                      <img
                        src={link}
                        alt="image"
                        className="object-contain p-1 rounded-md h-28 w-fit"
                      />
                      <div className="absolute transition-opacity opacity-0 cursor-pointer top-2 right-2 group-hover:opacity-100">
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="flex items-center justify-center w-5 h-5 bg-white rounded-full shadow-sm text-pink hover:shadow-lg"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    </div>
                  ))}
              </ReactSortable>
            </div>
          )}
        </div>

        {/* second row (description) */}
        <label>Product Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(ev) => setDecription(ev.target.value)}
        ></textarea>

        {/* third row (price) */}
        <label>Product Price</label>
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />

        {/* button to add the product */}
        <button type="submit" className="btn">
          Save
        </button>
      </form>
    </>
  );
}
