package com.superhan.springbootblog.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  // @EntityGraph를 붙이면 Lazy 조회가 아닌 Eeager조회로 한번에 조인으로 정보를 가져온다.
  @EntityGraph(attributePaths = "authorities")
  Optional<User> findOneWithAuthoritiesByUsername(String username);

  // @Query(value="SELECT u FROM user u WHERE username = :username AND password =
  // :password", nativeQuery=true)
  // User findByUsernameAndPassword(String username, String password);

}
