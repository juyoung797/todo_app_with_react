import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit }) => {
  console.log(todos);
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TodoList;
