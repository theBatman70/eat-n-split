import Button from "./utils/Button";

export default function FriendsList({
  friends,
  selectedId,
  onSelect,
  children,
}) {
  return (
    <div>
      <ul className="friendList">
        {friends.map((friend, i) => (
          <Friend
            key={friend.id}
            avatar={friend.avatarUrl}
            amountOwnedByYou={friend.amountOwnedByYou}
            selectedId={selectedId}
            onSelect={onSelect}
            id={friend.id}
            name={friend.name}
          ></Friend>
        ))}
      </ul>
      {children}
    </div>
  );
}

function Friend({ avatar, amountOwnedByYou, selectedId, onSelect, id, name }) {
  const selected = id === selectedId;
  const button = selected ? "Close" : "Select";
  const owesYou = amountOwnedByYou > 0;
  const youOwe = amountOwnedByYou < 0;
  const even = amountOwnedByYou === 0;

  return (
    <li className="friendItem">
      <div>
        <img src={avatar} alt="friend's pfp" />
      </div>
      <div>
        <h4>{name}</h4>
        <p className={even ? "" : youOwe ? "red" : "green"}>
          {balance(name, amountOwnedByYou)}
        </p>
      </div>
      <Button onClick={handleToggleSelect}>{button}</Button>
    </li>
  );

  function handleToggleSelect() {
    selected ? onSelect(null) : onSelect(id);
  }

  function balance(name, amountOwnedByYou) {
    if (even) return `You and ${name} are even`;
    if (youOwe) return `You owe ${name} ${Math.abs(amountOwnedByYou)}$`;
    if (owesYou) return `${name} owes you ${amountOwnedByYou}$`;
  }
}
