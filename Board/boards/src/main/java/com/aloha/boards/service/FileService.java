package com.aloha.boards.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.aloha.boards.domain.Files;

import jakarta.servlet.http.HttpServletResponse;

public interface FileService extends BaseService<Files> {

    // ⬆ 파일 업로드
    public boolean upload(Files file) throws Exception;
    public int upload(List<Files> fileList) throws Exception;
    
    // ⬇ 파일 다운로드
    public boolean download(String id, HttpServletResponse response) throws Exception;
    
    // 부모 기준 목록
    public List<Files> listByParent(Files file);
    // 부모 기준 삭제
    public int deleteByParent(Files file);

    // 선택 삭제(String) - no
    public int deleteFiles(String noList);
    // 선택 삭제(String) - id
    public int deleteFilesById(String idList);
    
    // 선택 삭제(List) - no
    public int deleteFileList(@Param("noList") List<Long> noList);
    // 선택 삭제(List) - id
    public int deleteFileListById(@Param("idList") List<String> idList);

    // 타입 별 파일 조회
    public Files selectByType(Files file);
    // 타입 별 파일 목록
    public List<Files> listByType(Files file);
}
