package com.superhan.springbootblog.user;

import lombok.RequiredArgsConstructor;

import java.util.Collections;
import java.util.Optional;

import com.superhan.springbootblog.auth.Authority;
import com.superhan.springbootblog.auth.UserDto;
import com.superhan.springbootblog.util.SecurityUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javassist.bytecode.DuplicateMemberException;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    /*
     * 생성자로 의존성을 등록할때는 UserRepository를 final로 등록하지 않아도 된다.
     * 하지만 @RequiredArgsConstructor를 사용할 때는 오직 초기화되지 않은 final 필드나
     * 
     * @NonNull이 붙은 필드에 대한 생성자를 생성해 준다.
     */
    // private UserRepository userRepository;
    // public UserService(UserRepository userRepository) {
    // this.userRepository = userRepository;
    // }

    public User register(UserDto userDto) throws DuplicateMemberException {
        if (userRepository.findOneWithAuthoritiesByUsername(userDto.getUsername()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어있는 유저입니다.");
        }

        Authority authority = Authority.builder().authorityName("ROLE_USER").build();

        User user = User.builder().username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword())).nickname(userDto.getNickname())
                .authorities(Collections.singleton(authority)).activated(true).build();

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String username) {
        return userRepository.findOneWithAuthoritiesByUsername(username);
    }

    @Transactional(readOnly = true)
    public Optional<User> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUsername);
    }

    // @Transactional
    // public void register(User user) {
    // String rawPassword = user.getPassword();
    // String encodedPassword = encoder.encode(rawPassword);
    // user.setPassword(encodedPassword);
    // // user.setRole(UserRole.ROLE_USER);
    // userRepository.save(user);
    // }

    // Select 할 때 트렌젝션 시작, 서비스 종료시에 트랜젝션 종료 (정합성)
    // @Transactional(readOnly = true)
    // public User login(User user) {
    // return userRepository.findByUsernameAndPassword(user.getUsername(),
    // user.getPassword());
    // }
}
