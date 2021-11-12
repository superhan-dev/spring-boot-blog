package com.superhan.springbootblog.auth;

import com.superhan.springbootblog.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthTokenDto {
  private String token;
  private User user;
}
