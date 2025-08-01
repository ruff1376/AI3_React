import React, { useEffect, useState } from 'react'
import Update from '../../components/board/Update'
import { useNavigate, useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'
import * as files from '../../apis/files'

const UpdateContainer = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  // 🧊 state
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])
  
  // 게시글 조회 요청
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data        // ⭐ data : 💌 board, fileList
    setBoard(data.board)
    setFileList(data.fileList)
  }

  // 다운로드
  const onDownload = async (id, fileName) => {
    // API 요청
    const response = await files.download(id)
    console.log(response);

    // 1. 서버에서 응답 파일 데이터를 받은 Blob 변환
    // 2. 브라우저를 통해 a 태그로 등록
    // 3. a 태그의 다운로드 기능으로 요청
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')    // a 태그 생성
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()                                // 다운로드 기능을 가진 a 태그 클릭
    document.body.removeChild(link)
  }

  // 게시글 수정 요청
  const onUpdate = async (data, headers) => {
    try {
      const response = await boards.update(data, headers)
      const msg = await response.data
      console.log(msg);
      alert('수정 완료')
      // 게시글 목록으로 이동
      navigate('/boards')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // 게시글 정보
    getBoard()
  }, [])

  // 게시글 삭제 요청
  const onDelete = async (id) => {
    try {
      const response = await boards.remove(id)
      const data = await response.data
      console.log(data);
      alert('삭제 완료')
      navigate('/boards')
    } catch (error) {
      console.log(error);
      
    }
  }

  // 파일 삭제
  const onDeleteFile = async (fileId) => {
    try {
      // 파일 삭제 요청
      const fileResponse = await files.remove(fileId)
      console.log(fileResponse.data);

      // 요청 성공 여부 체크

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
    } catch (error) {
      console.log(error);
    }
  }

  // 선택 삭제 요청
  const deleteCheckedFiles = async (idList) => {
    const fileIdList = idList.join(",")
    console.log(fileIdList);
    
    try {
      // 파일 선택 삭제 요청
      const response = await files.removeFiles( fileIdList )
      console.log(response.data);

      // 파일 목록 갱신
      const boardResponse = await boards.select(id)
      const data = boardResponse.data
      const fileList = data.fileList
      setFileList(fileList)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Update
        board={board}
        fileList={fileList}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onDownload={onDownload}
        onDeleteFile={onDeleteFile}
        deleteCheckedFiles={deleteCheckedFiles}
      />
    </>
  )
}

export default UpdateContainer