import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

const TodoForm = ({ isOpen, onClose, onSubmit, editingTodo = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.title.trim()) return;
    onSubmit(formData);
    onClose();
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title || "",
        description: editingTodo.description || "",
        completed: editingTodo.completed || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        completed: false,
      });
    }
  }, [editingTodo, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">할 일 수정</h2>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목 *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="할 일을 입력하세요"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field resize-none"
              placeholder="상세 설명을 입력하세요 (선택사항)"
              rows="3"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={formData.completed}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
              완료됨
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              취소
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save size={16} /> 수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;