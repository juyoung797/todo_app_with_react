package com.j797.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
    @NotBlank(message = "제목을 입력해주세요")
    @Size(max = 200, message = "제목은 최대 200자까지 허용됩니다")
    private String title;

    @Size(max = 1000, message = "설명은 최대 1000자까지 허용됩니다")
    private String description;
}
