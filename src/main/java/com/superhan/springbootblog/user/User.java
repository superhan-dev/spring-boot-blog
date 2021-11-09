package com.superhan.springbootblog.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @DynamicInsert insert 시에 null을 제외시켜준다.
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 프로젝트에 연결된 DB의 넘버링 전략을 따라간다. 데이터 베이스에따라 전략이 바뀐다.
    private Long id;

    @Column(nullable = false, length = 30, unique = true)
    private String username;

    @Column(length = 100) // 패스워드는 hash 값을 사용해서 정의하기 때문에 넉넉하게 100을 준다.
    private String password;

    @Column(nullable = false, length = 50)
    private String email;

    // default value를 줄 때 홑따운표를 사용해야한다.
    @Enumerated(EnumType.STRING)
    private UserRole role; // role은 enum을 사용하는게 좋다.

    @CreationTimestamp
    private Timestamp createDate;

}