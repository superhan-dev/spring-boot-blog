package com.superhan.springbootblog.config;

import com.superhan.springbootblog.jwt.JwtAccessDeniedHandler;
import com.superhan.springbootblog.jwt.JwtAuthenticationEntryPoint;
import com.superhan.springbootblog.jwt.JwtSecurityConfig;
import com.superhan.springbootblog.jwt.TokenProvider;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration // 빈 등록(IoC)
/**
 * @EnableWebSecurity를 사용하면 자동으로 AuthenticationPrincipalArgumentResolver를 설정파일에 설정한다.
 * 
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) // 특정 주소로 접근을 하면 권한 및 인증을 미리 체크하겠다는 의미
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/index*", "/static/**", "/*.js", "/*.json", "/*.ico");
    }

    // chaning을 통해서 필터의 우선순위를 뒤바꿀 수 있다.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors()
            .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                // h2 console을 위한 설정
                // .and().headers().frameOptions().sameOrigin()

                // session을 사용하지 않기 때문에 STATELESS로 세션을 설정한다.
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests() // 요청이 들어오면 동작
                .antMatchers("/api/boards/**").permitAll() // 특정 요청으로 들어오면 모든서비스를 허용한다.
                .antMatchers("/auth/**").permitAll() // 특정 요청으로 들어오면 모든서비스를 허용한다.
                .antMatchers("/index*", "/static/**", "/*.js", "/*.json", "/*.ico").permitAll()
                .anyRequest()
                .authenticated()


                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}
