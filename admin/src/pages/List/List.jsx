import React, { useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ListSkeletonLoader from "../../components/ListSkeletonLoader/ListSkeletonLoader";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    // Set loading to true before fetching
    setLoading(true);

    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }

    // Set loading to false after fetching
    setLoading(false);
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    // re-renders the list after removing any food items
    await fetchList();

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {loading ? (
          <ListSkeletonLoader /> // Render SkeletonLoader while loading
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
