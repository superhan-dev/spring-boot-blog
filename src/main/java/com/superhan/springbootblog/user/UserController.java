package com.superhan.springbootblog.user;

import javax.servlet.http.HttpSession;

import com.superhan.springbootblog.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class UserController {

    // @Autowired
    private final UserService userService;

    // public UserController(UserService userService) {
    // this.userService = userService;
    // }

    private final HttpSession session;

    @PostMapping("/register")
    public ResponseDto<Integer> register(@RequestBody User user) {
        log.info("UserController Register 호출");
        user.setRole(UserRole.USER);
        userService.register(user);

        return new ResponseDto<Integer>(HttpStatus.OK, HttpStatus.OK.value(), 1);
    }

    @PostMapping("/login")
    public ResponseDto<Integer> login(@RequestBody User user) {
        log.info("UserController Login 호출");
        User principal = userService.login(user);
        if (principal != null) {
            session.setAttribute("principal", principal);
        }

        return new ResponseDto<Integer>(HttpStatus.OK, HttpStatus.OK.value(), 1);
    }
}
