package com.superhan.springbootblog.auth;

import java.util.List;
import java.util.stream.Collectors;

import com.superhan.springbootblog.user.User;
import com.superhan.springbootblog.user.UserRepository;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   * 사용자 정보를 저장한 이후 userDetails 를 반환하게 되면 securityContext 안에 authentication객체 안에 값을 저장하게 된다.
   * 
   * QUESTION: 그렇다면 다른 객체에서 @AuthenticationPrincipal을 이용해서 값을 참조하기 위해 어떤 작업을 해야하지?
   * 
   * ANSWER: HandlerMethodArgumentResolver라는 인터페이스에서 request에서 넘어온 인자들을 메소드 파리미터로 해석할 수 있다.
   * AuthenticationPrincipalArgumentResolver를 통해서 구현되며 구현된 구현체는 @AuthenticationPrincipal을 통해 사용될 수 있다.
   * 
   *  */ 
  
  @Override
  @Transactional
  public UserDetails loadUserByUsername(final String username) {
    return userRepository.findOneWithAuthoritiesByUsername(username).map(user -> createUser(username, user))
        .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));
  }

  private org.springframework.security.core.userdetails.User createUser(String username, User user) {
    if (!user.isActivated()) {
      throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
    }
    List<GrantedAuthority> grantedAuthorities = user.getAuthorities().stream()
        .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName())).collect(Collectors.toList());
    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
        grantedAuthorities);
  }
}
