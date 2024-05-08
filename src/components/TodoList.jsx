import { useState, useEffect } from "react";
import {
  databases,
  DATABASES_ID,
  COLLECTION_MESSAGE_ID,
} from "../appwriteConfig";
import { ID, Query } from "appwrite";
import { RiDeleteBack2Fill } from "react-icons/ri";
import "../index.css";
import Filter from "./Filter";

function TodoList() {
  const [messagebody, setMessageBody] = useState([]);
  const [message, setMessage] = useState("");
  const [toggled, setToggled] = useState(false);

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
    setMessageBody(response.documents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { body: message, toggled: toggled };
    const response = await databases.createDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      ID.unique(),
      payload
    );
    console.log("Created", response);
    setMessageBody((prev) => [response, ...prev]);
    setMessage("");
  };

  const handleDelete = async (messageID) => {
    const response = await databases.deleteDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      messageID
    );
    console.log("Deleted message", response);
    setMessageBody((prev) =>
      messagebody.filter((message) => message.$id !== messageID)
    );
  };

  const hanldeToggle = async (messageId, currentToggled) => {
    // Toggle locally
    setToggled(!currentToggled);
    ///// Update in Backend  also
    const response = await databases.updateDocument(
      DATABASES_ID,
      COLLECTION_MESSAGE_ID,
      messageId,
      { toggled: !currentToggled }
    );

    // setting messsage Toggled
    setMessageBody((prev) =>
      prev.map((msg) =>
        msg.$id === messageId ? { ...msg, toggled: !currentToggled } : msg
      )
    );
  };

  return (
    <>
      <div className="container pt-10">
        <div className="child-container sm:w-min  flex flex-col justify-center sm:px-4 py-4 items-center mx-auto gap-10 box_shadow rounded-2xl">
          <div className="flex items-center justify-center py-4 px-6 rounded-3xl ">
            <div className="flex flex-wrap items-center justify-center px-2 py-8 sm:px-6 rounded-3xl box_shadow_inset ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-1 sm:flex-nowrap items-center justify-center rounded-lg inset-0 "
              >
                <div className="coolinput flex flex-col ">
                  <input
                    className="rounded-md outline-none border-none px-4 py-1 w-[60vw] sm:w-[10vw] md:w-[14vw] lg:w-[15vw] xl:w-[16vw]"
                    required
                    placeholder="Write your todo..."
                    name="input"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                </div>

                <button type="sumbit" className="pushable">
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front">{message ? "Save" : "ADD"}</span>
                </button>
              </form>
            </div>
          </div>

          <div>
            <Filter setMessageBody={setMessageBody} messagebody={messagebody} />
          </div>

          <div
            className={`flex flex-col text-white outline-none border-none items-center justify-center gap-2 rounded-2xl  box_shadow_inset ${
              messagebody ? "px-2 sm:px-8 py-6" : "p-0"
            }`}
          >
            {messagebody.map((message) => (
              <div
                key={message.$id}
                className={`${
                  message.toggled ? " bg-[#dc8383]" : ""
                } container flex flex-wrap items-center justify-center rounded-xl py-4 px-6 box_shadow`}
              >
                <div className="message-wrapper font-semibold w-[70vw] sm:w-[34vw]">
                  <p className="text-xs">
                    {new Date(message.$createdAt).toLocaleString()}
                  </p>
                  <div className="message-wrapper w-full tracking-tighter justify-between flex">
                    <p
                      onClick={() => hanldeToggle(message.$id, message.toggled)}
                      className={`${
                        message.toggled ? "line-through " : ""
                      } cursor-pointer font-semibold text-[18px]`}
                    >
                      {message.body}
                    </p>

                    <RiDeleteBack2Fill
                      onClick={() => handleDelete(message.$id)}
                      className="Deletebtn cursor-pointer text-[20px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;
