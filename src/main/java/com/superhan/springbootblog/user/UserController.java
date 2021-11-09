package com.superhan.springbootblog.user;

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
@RequestMapping(value = "/api")
public class UserController {

//    @Autowired
    private final UserService userService;

//    public UserController(UserService userService) {
//        this.userService = userService;
//    }

    @PostMapping("/users")
    public ResponseDto<Integer> save(@RequestBody User user){
        log.info("UserController Save 호출");
        user.setRole(UserRole.USER);
        int result = userService.join(user);

        return new ResponseDto<Integer>(HttpStatus.OK,result);
    }


}
