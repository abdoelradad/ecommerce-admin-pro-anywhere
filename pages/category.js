import Layout from "@/components/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Category({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/category").then((result) => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();

    if (editedCategory) {
      await axios.put("/api/category", {
        name,
        parentCategory,
        _id: editedCategory._id,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      });
      setEditedCategory(null);
    } else {
      await axios.post("/api/category", {
        name,
        parentCategory,
        properties: properties.map((p) => ({
          name: p.name,
          values: p.values.split(","),
        })),
      });
    }

    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }

  async function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Delete",
        reverseButtons: true,
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        // when confirmed and promise resolved...
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/category?_id=" + _id);
          fetchCategories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory} className="mt-3">
        <label>
          {editedCategory
            ? `Edit Category ${editedCategory.name}`
            : "New Category Name"}
        </label>

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <select
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        {/* Add propert  */}
        <div className="flex items-center gap-1 mb-3">
          <label>Properties</label>
          <button
            type="button"
            className="mb-1 ml-5 text-xs md:text-sm btn"
            onClick={addProperty}
          >
            Add New property
          </button>
        </div>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div key={index} className="flex flex-row items-center gap-1">
              <input
                type="text"
                value={property.name}
                onChange={(ev) =>
                  handlePropertyNameChange(index, property, ev.target.value)
                }
                placeholder="property name example: (color)"
              />

              <input
                type="text"
                value={property.values}
                placeholder="values, comma seperated"
                onChange={(ev) =>
                  handlePropertyValuesChange(index, property, ev.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeProperty(index)}
                className="px-4 py-2 mb-2 capitalize bg-red-400 rounded-lg shadow-sm font-sembold font-sm"
              >
                remove
              </button>
            </div>
          ))}
        {editedCategory && (
          <button
            type="button"
            onClick={() => {
              setEditedCategory(null);
              setName("");
              setParentCategory("");
              setProperties([]);
            }}
            className="mr-1 btn"
          >
            Cancel
          </button>
        )}
        <button type="submit" className="text-xs md:text-lg btn">
          Save
        </button>
      </form>
      {!editedCategory && (
        <table className="w-full mt-4 basic">
          <thead>
            <tr>
              <td className="text-xs">Category name</td>
              <td className="text-xs">Category parent</td>
              <td className="text-xs">Control</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category.name}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <div className="flex flex-col  items-center md:flex-row gap-1">
                      <button
                        onClick={() => editCategory(category)}
                        className="text-xs btn md:text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="text-xs btn md:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <Category swal={swal} />);
