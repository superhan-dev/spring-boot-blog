package com.superhan.springbootblog.user;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserRepository userRepository;

  // 사용자 권한이 ADMIN인 계정만 접근가능한 서비스
  // 특정 사용자의 정보를 조회하기 위한 서비스
  @GetMapping("/users/{username}")
  @PreAuthorize("hasAnyRole('ADMIN')")
  public ResponseEntity<User> getUserInfo(@PathVariable String username) {
    return username != "me" ? ResponseEntity.ok(userService.getUserWithAuthorities(username).get()) : null;
  }

  // 사용자 권한이 USER 또는 ADMIN인 계정만 접근가능한 서비스
  // 현재 로그인 중인 사용자가 자기 자신을 확인하기 위한 서비스
  @GetMapping("/users/me")
  @PreAuthorize("hasAnyRole('USER','ADMIN')")
  public ResponseEntity<User> getMyUserInfo() {
    return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
  }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsers() {
    return ResponseEntity.ok(userRepository.findAll());
  }

}
