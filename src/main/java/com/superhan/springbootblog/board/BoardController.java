package com.superhan.springbootblog.board;


import com.superhan.springbootblog.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BoardController {
  private final BoardService boardService;

  /**
   * 
   * @param board
   * @param user
   *  @AuthenticationPrincipal을 사용하면 SequrityContextHolder에 저장된 User객체를 사용할 수 있다.
   *  좀 더 정확히는 UserDetailService(현재 커스텀 되어있음)의 loadUserByUsername() 메소드를 통해 반환한 User를 사용할 수 있다.
   *
   * @return
   * @throws UserPrincipalNotFoundException
   */
  @PostMapping("/boards")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Board> save(@RequestBody Board board, @AuthenticationPrincipal User user) 
      throws UserPrincipalNotFoundException{
        log.info("security context username: {}, authorities: {}",user.getUsername(), user.getAuthorities());
    return ResponseEntity.ok(boardService.save(board,user));
  }

  @PatchMapping("/boards")
  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Board> update(@RequestBody Board board, @AuthenticationPrincipal User user)
          throws UserPrincipalNotFoundException{
    return ResponseEntity.ok(boardService.update(board,user));
  }

  @GetMapping("/boards")
  @PreAuthorize("permitAll()")
  public ResponseEntity<Page<Board>> getBoards(Pageable pageable){
    return ResponseEntity.ok(boardService.findAll(pageable));
  }

  @GetMapping("/boards/{id}")
  @PreAuthorize("permitAll()")
//  @PreAuthorize("hasAuthority('USER')")
  public ResponseEntity<Board> getBoard(@PathVariable Long id){
    return ResponseEntity.ok(boardService.findById(id));
  }
}
