import React, { useEffect, useState } from "react";

function Filter({ setMessageBody, messagebody }) {
  // messagebody=[]
  const [option, setOption] = useState("ALL");

  // Update the messagebody state when props change
  useEffect(() => {
    setMessageBody(messagebody);
  }, [messagebody, setMessageBody]);

  const handleSortTodo = (value) => {
    let filterMessages = [];

    if (value === "ALL") {
      filterMessages = messagebody;
    } else if (value === "Not Completed") {
      filterMessages = messagebody.filter((message) => !message.toggled);
    } else if (value === "Completed") {
      filterMessages = messagebody.filter((message) => message.toggled);
    }

    setMessageBody(filterMessages);
  };

  return (
    <div className="fliter-wrapper text-white">
      <div>
        <select
          onChange={(e) => {
            setOption(e.target.value);
            handleSortTodo(e.target.value);
          }}
          value={option}
          className="bg-[#d99191]  box_shadow px-2 py-2 outline-none border-none rounded-md"
        >
          <option value={"ALL"}>All</option>
          <option value={"Not Completed"}>Not Completed</option>
          <option value={"Completed"}>Completed</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
