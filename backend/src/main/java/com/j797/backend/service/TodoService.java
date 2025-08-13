package com.j797.backend.service;

import com.j797.backend.dto.TodoDto;
import com.j797.backend.dto.TodoResponseDto;
import com.j797.backend.dto.TodoStatsDto;
import com.j797.backend.dto.TodoUpdateDto;
import com.j797.backend.model.Todo;
import com.j797.backend.repository.TodoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoResponseDto createTodo(TodoDto dto) {
        Todo todo = new Todo(dto.getTitle(), dto.getDescription());
        Todo savedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(savedTodo);
    }

    public List<TodoResponseDto> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc().stream().map(TodoResponseDto::fromEntity).toList();
    }

    public Page<TodoResponseDto> getAllTodos(Pageable pageable) {
        return todoRepository.findAll(pageable).map(TodoResponseDto::fromEntity);
    }

    public List<TodoResponseDto> getTodosByCompleted(Boolean completed) {
        return todoRepository.findByCompletedOrderByCreatedAtDesc(completed).stream().map(TodoResponseDto::fromEntity).toList();
    }

    public List<TodoResponseDto> searchTodosByTitle(String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title).stream().map(TodoResponseDto::fromEntity).toList();
    }

    public TodoResponseDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("todo를 찾을수 없습니다."));
        return TodoResponseDto.fromEntity(todo);
    }

    public TodoResponseDto updateTodo(Long id, TodoUpdateDto dto) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("todo를 찾을수 없습니다."));

        if (dto.getTitle() != null && !dto.getTitle().trim().isEmpty()) { // null, empty check
            todo.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            todo.setDescription(dto.getDescription());
        }
        if (dto.getCompleted() != null) {
            todo.setCompleted(dto.getCompleted());
        }
        Todo updatedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(updatedTodo);
    }

    public TodoResponseDto toggleTodoCompleted(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new NoSuchElementException("todo를 찾을수 없습니다."));
        todo.setCompleted(!todo.getCompleted());
        Todo updatedTodo = todoRepository.save(todo);
        return TodoResponseDto.fromEntity(updatedTodo);
    }

    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new NoSuchElementException("할 일을 찾을 수 없습니다.");
        }
        todoRepository.deleteById(id);
    }

    public TodoStatsDto getStats() {
        long totalCount = todoRepository.count();
        long completedCount = todoRepository.countByCompleted(true);
        long pendingCount = todoRepository.countByCompleted(false);

        return new TodoStatsDto(totalCount, completedCount, pendingCount);
    }
}
