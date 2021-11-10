package com.superhan.springbootblog.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  // @Query(value="SELECT u FROM user u WHERE username = :username AND password =
  // :password", nativeQuery=true)
  User findByUsernameAndPassword(String username, String password);
}
