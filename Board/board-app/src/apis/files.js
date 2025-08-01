import axios from "axios";

// 업로드
export const upload = (data, headers) => axios.post(`/files`, data, headers)

// 다운로드
export const download = (id) => axios.get(`/files/download/${id}`, {responseType: 'blob'})

// 파일 삭제
export const remove = (id) => axios.delete(`/files/${id}`)

// 파일 선택 삭제
export const removeFiles = (idList) => axios.delete(`/files?idList=${idList}`)

// 타입 별 파일 목록
export const fileByType = (pTable, pNo, type) => axios.get(`/files/${pTable}/${pNo}?type=${type}`)
