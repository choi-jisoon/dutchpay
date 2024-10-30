// MeetingCard.js
import React from 'react';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MeetingCard({ meeting, onDelete, onEdit }) {
   const perPersonAmount = meeting.members.length > 0
      ? Math.ceil(meeting.amount / meeting.members.length / 100) * 100
      : 0;

   return (
      <div className="meeting-card">
         <div className="text-section">
            <h3>{meeting.title}</h3>
            <p>날짜 : {meeting.date}</p>
            <p>총액 : {meeting.amount.toLocaleString()}원</p>
            <p>참여자: {meeting.members.join(', ')}</p>
            <p className='moneyspan'>1인당 분담금 : {perPersonAmount.toLocaleString()}원</p>
         </div>
         <div className="button_group">
            <button onClick={onEdit}><FontAwesomeIcon icon={faPen} size="2x" /></button>
            <button onClick={onDelete}><FontAwesomeIcon icon={faTrashCan} size="2x" /></button>
         </div>
      </div>
   );
}


export default MeetingCard;
