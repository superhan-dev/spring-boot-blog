package com.superhan.springbootblog.auth;

import javax.validation.Valid;

import com.superhan.springbootblog.dto.ResponseDto;
import com.superhan.springbootblog.jwt.JwtFilter;
import com.superhan.springbootblog.jwt.TokenProvider;
import com.superhan.springbootblog.user.User;
import com.superhan.springbootblog.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javassist.bytecode.DuplicateMemberException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping(value = "/auth")
public class AuthController {

    // @Autowired
    private final UserService userService;

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    // public UserController(UserService userService) {
    // this.userService = userService;
    // }

    // private final HttpSession session;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody UserDto userDto) throws DuplicateMemberException {
        log.info("UserController Register 호출");

        return ResponseEntity.ok(userService.register(userDto));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    // @PostMapping("/login")
    // public ResponseDto<Integer> login(@RequestBody User user) {
    // log.info("UserController Login 호출");
    // User principal = userService.login(user);
    // if (principal != null) {
    // session.setAttribute("principal", principal);
    // return new ResponseDto<Integer>(HttpStatus.OK, HttpStatus.OK.value(), 1);
    // }

    // return new ResponseDto<Integer>(HttpStatus.NOT_FOUND,
    // HttpStatus.NOT_FOUND.value(), -1);

    // }
}
