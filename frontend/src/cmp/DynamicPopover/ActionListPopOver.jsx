export function ActionList({ list, board, onUpdateBoard }) {
  function onDeleteList() {
    const listIdx = board.lists.findIndex(
      (listToFind) => listToFind.listId === list.listId
    );
    board.lists.splice(listIdx, 1);
    console.log("board from delete", board);
    const action = `Deleted list ${list.listTitle}`;
    onUpdateBoard(action);
  }

  return (
    <div>
      <p className="pointer" onClick={onDeleteList}>
        Delete
      </p>
    </div>
  );
}
