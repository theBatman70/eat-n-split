import { useState } from "react";
import Button from "./Button";

export default function AddFriendForm({ onToggle, onAdd }) {
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("http://i.pravatar.cc/48");
  return (
    <div>
      <form className="form-add-friend" onSubmit={handleAddSubmit}>
        <label>😄 Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>👤 Image Url</label>
        <input
          type="text"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />

        <Button>Add</Button>
      </form>
    </div>
  );

  function handleAddSubmit(e) {
    e.preventDefault();
    if (name === "") return;
    onAdd(name, imgUrl);
    onToggle();
  }
}
