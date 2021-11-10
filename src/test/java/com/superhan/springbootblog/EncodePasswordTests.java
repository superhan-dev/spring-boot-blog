package com.superhan.springbootblog;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class EncodePasswordTests {

  @Test
  public void hashEncoding() {
    String encodedPassword = new BCryptPasswordEncoder().encode("rawPassword");
    System.out.println("rawPassword 해쉬: " + encodedPassword);
  }
}
