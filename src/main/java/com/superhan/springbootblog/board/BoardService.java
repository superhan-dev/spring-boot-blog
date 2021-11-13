package com.superhan.springbootblog.board;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;
import java.util.Optional;

import com.superhan.springbootblog.user.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
  
  private final BoardRepository boardRepository;

  @Transactional
  public Board save(Board board, User user) throws UserPrincipalNotFoundException{
    if(user == null){
      throw new UserPrincipalNotFoundException(null);
    }
    board.setCount(0);
    board.setUser(user);
    return boardRepository.save(board);
  }

  public Page<Board> findAll(Pageable pageable) {
    return boardRepository.findAll(pageable);
  }

  public Board findById(Long id) {
    return boardRepository.findById(id).orElseThrow();
  }

  public Board update(Board board, User user) {
    Optional<Board> oldBoard = boardRepository.findById(board.getBoardId());




    return null;
  }
}
