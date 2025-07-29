import React from 'react'

const Footer = ({ onDeleteAll, onComplateAll }) => {
    return (
        <div className="footer">
            <div className="item">
                <button className="btn" onClick={onDeleteAll}>전체삭제</button>
            </div>
            <div className="item">
                <button className="btn" onClick={onComplateAll}>전체완료</button>
            </div>
        </div>
    )
}

export default Footer