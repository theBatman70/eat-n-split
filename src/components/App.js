import AddFriendForm from "./AddFriendForm";
import "./../index.css";
import { FriendsList } from "./FriendsList";
import { SplitForm } from "./SplitForm";
import { useState } from "react";
import Button from "./Button";

const initialData = [
  {
    name: "Clark",
    avatarUrl: "https://i.pravatar.cc/48",
    amountOwnedByYou: 0,
  },
  {
    name: "Emma",
    avatarUrl: "https://i.pravatar.cc/49",
    amountOwnedByYou: 25,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  let selectedFriend = friends[selectedIndex];
  const addFriendButton = isAddOpen ? "Close" : "Add Friend";

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelect}
          selectedIndex={selectedIndex}
        ></FriendsList>
        {isAddOpen && (
          <AddFriendForm onToggle={handleToggleAdd} onAdd={handleAdd} />
        )}
        <Button onClick={handleToggleAdd}>{addFriendButton}</Button>
      </div>
      {selectedIndex !== null ? (
        <SplitForm friend={selectedFriend} onSplit={handleSplit} />
      ) : null}
    </div>
  );

  function handleSelect(i) {
    setSelectedIndex(i);
  }

  function handleToggleAdd() {
    setIsAddOpen((t) => !t);
  }

  function handleAdd(name, imgUrl) {
    setFriends((f) => [
      ...f,
      { name: name, avatarUrl: imgUrl, amountOwnedByYou: 0 },
    ]);
  }

  function handleSplit(friend, amountOwnedByYou) {
    setFriends(
      friends.map((ele) =>
        friend === ele
          ? {
              ...friend,
              amountOwnedByYou: ele.amountOwnedByYou + amountOwnedByYou,
            }
          : ele
      )
    );
    setSelectedIndex(null);
  }
}
