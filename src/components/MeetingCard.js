import React from 'react';

function MeetingCard({ meeting, onDelete, onEdit }) {
   return (
      <div className="meeting-card">
         <div className="text-section">
            <h3>{meeting.title}</h3>
            <p>날짜: {meeting.date}</p>
            <p>총액: {meeting.amount}원</p>
            <p>참여자: {meeting.members.join(', ')}</p>
         </div>
         <div className='button_group'>
            <button onClick={onEdit}>수정</button>
            <button onClick={onDelete}>삭제</button>
         </div>
      </div>
   );
}

export default MeetingCard;
