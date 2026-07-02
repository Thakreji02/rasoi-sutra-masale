package com.rasoisutra.ecom.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<T>(true, message, data);
    }

    public static ApiResponse<Void> success(String message) {
        return new ApiResponse<Void>(true, message, null);
    }

    public static ApiResponse<Void> error(String message) {
        return new ApiResponse<Void>(false, message, null);
    }
}
