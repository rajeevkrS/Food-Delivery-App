import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [removingId, setRemovingId] = useState(null); // track which item is being removed

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Function to fetch food list
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  // Function to remove food item
  const removeFood = async (foodId) => {
    setRemovingId(foodId); // Show spinner just for this item

    const response = await axios.post(`${url}/api/food/remove`, {
      id: foodId,
    });

    await fetchList(); // Refresh list
    setRemovingId(null); // Hide spinner

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  // Fetch list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // Scroll to top on pagination
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="list add flex-col">
      <h3>All Foods List</h3>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item._id} className="list-table-format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>

              <p
                className="cursor remove-btn"
                onClick={() => (removingId ? null : removeFood(item._id))}
              >
                {removingId === item._id ? (
                  <span className="spinner"></span>
                ) : (
                  "X"
                )}
              </p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "10px" }}>
            Loading items...
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {list.length > ITEMS_PER_PAGE && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
