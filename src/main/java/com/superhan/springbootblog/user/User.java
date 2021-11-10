package com.superhan.springbootblog.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import com.superhan.springbootblog.auth.Authority;

import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// @DynamicInsert insert 시에 null을 제외시켜준다.
public class User {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 프로젝트에 연결된 DB의 넘버링 전략을 따라간다. 데이터 베이스에따라 전략이 바뀐다.
    private Long userId;

    @Column(name = "username", length = 50, unique = true)
    private String username;

    @Column(name = "password", length = 100)
    private String password;

    // default value를 줄 때 홑따운표를 사용해야한다.
    // @Enumerated(EnumType.STRING)
    // private UserRole role; // role은 enum을 사용하는게 좋다.

    @Column(name = "nickname", length = 50)
    private String nickname;

    @CreationTimestamp
    private Timestamp createDate;

    @Column(name = "activated")
    private boolean activated;

    @ManyToMany
    @JoinTable(name = "user_authority", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "user_id") }, inverseJoinColumns = {
                    @JoinColumn(name = "authority_name", referencedColumnName = "authority_name") })

    private Set<Authority> authorities;
}