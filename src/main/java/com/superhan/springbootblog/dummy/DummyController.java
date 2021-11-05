package com.superhan.springbootblog.dummy;

import com.superhan.springbootblog.user.User;
import com.superhan.springbootblog.user.UserRepository;
import com.superhan.springbootblog.user.UserRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/dummy")
public class DummyController {

    private final UserRepository userRepository;

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id){

        // id를 넘겨주어 조회가 끝난 후에 user가 반환될 때 영속성 컨텍스트의 1차 캐시에 user가 영속화된다.
        User user = userRepository.findById(id).orElseThrow(() -> {
            return new IllegalArgumentException("해당 사용자는 없습니다. " + id);
        });
        // 요청: 웹브라우저
        // User: Java Object
        // 변환 (웹브라우저가 이해할 수 있는 데이터 -> json (Gson 라이브러리)
        // 스프링 부트 = MessageConverter라는 애가 응답시에 자동 작동
        // 만약 자바 오브젝트를 리턴하게 되면 MessageConverter가 Jackson 라이브러리를 호출해서
        // User 오브젝트를 json로 변환하여 브라우저에게 던져줍니다.
        return user;
    }

    @GetMapping("/users")
    public Page<User> getUsers(Pageable pageable){
        Page<User> users = userRepository.findAll(pageable);
        return users;
    }

    // @Transactional을 사용하면 함수가 실행될때 시작되었다가 함수가 종료될때 자동으로 DB에 commit을 실생한다.
    // 때문에 userRepository.save(user); 와 같은 함수를 미리 정의할 필요도 없고,
    // 여러개의 엔티티를 편집하더라도 영속성 컨텍스트에 존재하는 "쓰기 지연 Sql 저장소"에 저장해 두었다가 함수 종료 시 한번에 쿼리를 수행한다.
    @Transactional // 함수 종료시에 자동 커밋
    @PatchMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User requestUser){
        User user = userRepository.findById(id).orElseThrow(() -> {
           return new IllegalArgumentException("수정에 실패하였습니다. " + id);
        });
        user.setEmail(requestUser.getEmail());
        user.setPassword(requestUser.getPassword());

        // 기존은 이와같은 방식으로 DB의 데이터를 가져와 요청 데이터를 덮어쓰고 다시 save를 하는 방법을 썼지만
        // 이와 같은 경우 id가 존재하지 않는 경우가 생기면 새로운 데이터를 저장한다.
        // 따라서 @Transectional 을 사용한다.
        // @Transectional을 사용하면면
        // userRepository.save(user);

        // 더티 체킹
        return null;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id){
        try {
            userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e){
            return "삭제에 실패 하였습니다. " + id + "를 찾을 수 없습니다.";
        }
        return id + "를 삭제하였습니다.";
    }

    @PostMapping("/join")
    public String join(User user){
        user.setRole(UserRole.USER);
        userRepository.save(user);
        return "회원가입이 완료되었습니다.";
    }


}
