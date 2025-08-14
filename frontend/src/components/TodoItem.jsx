import { Clock, Check, Edit, Trash2 } from "lucide-react";

const TodoItem = ({ todo, onToggle, onEdit }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const createdAt = formatDate(todo.createdAt);
  const updatedAt = formatDate(todo.updatedAt);

  return (
    <li className={`todo-item ${todo.completed ? "todo-completed" : ""}`}>
      <div className="flex items-start gap-3">
        <button
          className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-colors duration-200 flex items-center justify-center ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400"
          }`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed && <Check size={14} />}
        </button>
        <div className="flex-grow">
          <h3
            className={`font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 ${
                todo.completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}{" "}
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
            <Clock size={12} />
            <span>생성: {createdAt}</span>
            {createdAt !== updatedAt && <span>수정: {updatedAt}</span>}
          </div>
        </div>
        <div>
          <div className="flex gap-1">
            <button
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
              onClick={() => onEdit(todo)}
            >
              <Edit size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
