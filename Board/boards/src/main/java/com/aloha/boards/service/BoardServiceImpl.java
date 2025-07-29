package com.aloha.boards.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aloha.boards.domain.Boards;
import com.aloha.boards.mapper.BoardMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired private BoardMapper boardMapper;

    @Override
    public List<Boards> list() {
        return boardMapper.list();
    }

    @Override
    public PageInfo<Boards> list(int page, int size) {
        PageHelper.startPage(page, size);
        List<Boards> list = boardMapper.list();
        PageInfo<Boards> pageInfo = new PageInfo<>(list);
        // createdAt 내림차순 정렬
        pageInfo.getList().sort((b1, b2) -> b2.getCreatedAt().compareTo(b1.getCreatedAt()));

        return pageInfo;
    }

    @Override
    public Boards select(Long no) {
        return boardMapper.select(no);
    }

    @Override
    public Boards selectById(String id) {
        return boardMapper.selectById(id);
    }

    @Override
    public boolean insert(Boards entity) {
        return boardMapper.insert(entity) > 0;
    }

    @Override
    public boolean update(Boards entity) {
        return boardMapper.update(entity) > 0;
    }

    @Override
    public boolean updateById(Boards entity) {
        return boardMapper.updateById(entity) > 0;
    }

    @Override
    public boolean delete(Long no) {
        return boardMapper.delete(no) > 0;
    }

    @Override
    public boolean deleteById(String id) {
        return boardMapper.deleteById(id) > 0;
    }
    
}
