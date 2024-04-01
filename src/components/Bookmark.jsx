import React, { useState, useEffect } from "react";

function Bookmark() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [edit, setEdit] = useState(null);
  const [bookmarks, setBookmarks] = useState({});

  useEffect(() => {
    const storedBookmark = JSON.parse(localStorage.getItem("bookmarks"));
    if (storedBookmark) {
      setBookmarks(storedBookmark);
    }
  }, []);

  const websiteTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const websiteUrlChangeHandler = (event) => {
    setUrl(event.target.value);
  };

  const submitHandler = () => {
    if (title && url) {
      const bookmarkId = Date.now().toString;
      const newBookmark = {
        title: title,
        url: url,
      };

      setBookmarks((prevBookmark) => ({
        ...prevBookmark,
        [bookmarkId]: newBookmark,
      }));

      setTitle("");
      setUrl("");

      localStorage.setItem(
        "bookmarks",
        JSON.stringify({ ...bookmarks, [bookmarkId]: newBookmark })
      );
    }
  };

  const editHandler = (bookmarkId) => {
    setTitle(bookmarks[bookmarkId].title);
    setUrl(bookmarks[bookmarkId].url);
    setEdit(bookmarkId);
  };

  const deleteHandler = (bookmarkId) => {
    const updatedBookmark = { ...bookmarks };
    delete updatedBookmark[bookmarkId];
    setBookmarks(updatedBookmark);

    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmark));
  };

  return (
    <>
      <h1>Bookmark Website</h1>
      <label htmlFor="title">Website Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={websiteTitleChangeHandler}
      />

      <label htmlFor="title">Website Url</label>
      <input
        type="text"
        id="url"
        value={url}
        onChange={websiteUrlChangeHandler}
      />

      <button onClick={submitHandler}>{edit ? "Update" : "Add"}</button>

      {Object.entries(bookmarks).map(([bookmarkId, bookmark]) => (
        <div key={bookmarkId}>
          <ul>
            <li>
              {bookmark.title}- <a href={bookmark.url}>{bookmark.url}</a>{" "}
              <button onClick={() => editHandler(bookmarkId)}>Edit</button>
              <button onClick={() => deleteHandler(bookmarkId)}>Delete</button>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default Bookmark;
