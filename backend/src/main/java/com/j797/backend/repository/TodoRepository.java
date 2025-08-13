package com.j797.backend.repository;

import com.j797.backend.model.Todo;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByOrderByCreatedAtDesc();

    List<Todo> findByCompletedOrderByCreatedAtDesc(Boolean completed);

    @Query("SELECT t FROM Todo t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%')) ORDER BY t.createdAt DESC")
    List<Todo> findByTitleContainingIgnoreCase(@Param("title") String title);

    long countByCompleted(Boolean completed);
}