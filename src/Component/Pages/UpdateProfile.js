import React, { useRef, useEffect, useContext } from "react";
import AuthContext from "../../Store/AuthContext";

export default function UpdateProfile() {
  const authCtx = useContext(AuthContext);

  const formRef = useRef();
  const token = localStorage.getItem("token");
  const submitHandler = (event) => {
    event.preventDefault();
    const fullName = formRef.current.elements.name.value;
    const photoUrl = formRef.current.elements.profilephoto.value;
    console.log(fullName, photoUrl);

    const data = {
      idToken: token,
      displayName: fullName,
      photoUrl: photoUrl,
      // deleteAttribute:["DISPLAY_NAME", "PHOTO_URL"],
      returnSecureToken: true,
    };
    console.log(data);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDXx5szR2zhd9OQlqBegt7PJUE8RXQAqAk",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response
        console.log("Profile updated:", data); //This response does not contain displayName,photoUrl
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  async function fetchData() {
    // console.log("TOKEN",token);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXx5szR2zhd9OQlqBegt7PJUE8RXQAqAk",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: token,
        }),
      }
    )
      .then((response) => {
        // console.log(response)
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data", data); //This response does not contain displayName,photoUrl
        // console.log(data.users[0].displayName);
        formRef.current.elements.name.value = data.users[0].displayName;
        formRef.current.elements.profilephoto.value = data.users[0].photoUrl;
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
       <h2 className="text-xl mb-4 ">Winners never quit, quitters never win</h2>
      <form onSubmit={submitHandler} className="max-w-md mx-auto">
     <label className="block mb-2 font-medium text-gray-800">
        Contact Details
      </label>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-800"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profilephoto"
            className="block mb-2 font-medium text-gray-800"
          >
            Profile Photo URL
          </label>
          <input
            type="text"
            id="profilephoto"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
