package com.superhan.springbootblog.board;

import com.superhan.springbootblog.reply.Reply;
import com.superhan.springbootblog.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BoardId;

    @Column(nullable = false, length = 100)
    private String title;

    @Lob // 대용량 데이터
    private String content; // 섬머노트 라이브러리 <html> 테그가 섞여서 디자인이됨

    private int count;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // object를 저장하면 JPA에 의해 ORM이 동작하여 테이블에 userId라는 컬럼명이 만들어진다.

//    @OneToMany(mappedBy="board",fetch = FetchType.EAGER) // mappedBy 연관 관계의 주인이 아니다.
//    private List<Reply> reply;

    @CreationTimestamp
    private Timestamp createDate;


}
