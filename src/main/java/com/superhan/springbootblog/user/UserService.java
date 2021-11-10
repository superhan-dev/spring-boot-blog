package com.superhan.springbootblog.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

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

    @Transactional
    public void register(User user) {
        userRepository.save(user);
    }

    // Select 할 때 트렌젝션 시작, 서비스 종료시에 트랜젝션 종료 (정합성)
    @Transactional(readOnly = true)
    public User login(User user) {
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }
}
