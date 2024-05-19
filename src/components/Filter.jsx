import React, { useEffect, useState } from "react";
import {
  databases,
  DATABASES_ID,
  COLLECTION_MESSAGE_ID,
} from "../appwriteConfig";
import { Query } from "appwrite";

function Filter({ setMessageBody }) {
  const [option, setOption] = useState("ALL");
  const [allMessages, setAllMessages] = useState([]); // To store all messages

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      [Query.orderDesc("$createdAt")]
    );
    console.log("Response : ", response);
    setAllMessages(response.documents); // Store all messages initially
    setMessageBody(response.documents);
  };

  const handleSortTodo = (value) => {
    setOption(value);
    let filterMessages = [];
    if (value === "ALL") {
      filterMessages = allMessages;
    } else if (value === "Not Completed") {
      console.log("Not Completed is ", value);
      filterMessages = allMessages.filter((message) => !message.toggled);
    } else if (value === "Completed") {
      console.log("Completed is ", value);
      filterMessages = allMessages.filter((message) => message.toggled);
    }
    setMessageBody(filterMessages);
  };

  return (
    <div className="fliter-wrapper text-white">
      <div>
        <select
          onChange={(e) => {
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
