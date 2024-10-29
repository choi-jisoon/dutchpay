// AddMeetingPage.js
import React, { useState, useEffect } from 'react';

function AddMeetingPage({ onSaveMeeting, initialData, onBackClick ,onCancel}) {
   // 초기값 설정 (initialData가 있으면 수정 모드)
   const [title, setTitle] = useState(initialData ? initialData.title : '');
   const [amount, setAmount] = useState(initialData ? initialData.amount : '');
   const [date, setDate] = useState(initialData ? initialData.date : '');
   const [members, setMembers] = useState(initialData ? initialData.members : []);
   const [newMember, setNewMember] = useState('');

   useEffect(() => {
      if (initialData) {
         setTitle(initialData.title);
         setAmount(initialData.amount);
         setDate(initialData.date);
         setMembers(initialData.members);
      }
   }, [initialData]);

   // 새로운 멤버 추가 함수
   const addMember = () => {
      if (newMember.trim()) {
         setMembers([...members, newMember.trim()]);
         setNewMember('');
      }
   };

   // 모임 저장 함수
   const saveMeeting = () => {
      const meetingData = {
         id: initialData ? initialData.id : Date.now(),
         title,
         amount,
         date,
         members,
      };
      onSaveMeeting(meetingData);
   };

   return (
      <div className="add-meeting-page">
         <header>
            <h1>{initialData ? '모임 수정' : '모임 추가'}</h1>
            <button onClick={onCancel}>뒤로 가기</button>
         </header>
         <form onSubmit={(e) => e.preventDefault()}>
            <label>모임명</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="모임명을 입력하세요" />

            <label>지출금액</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="금액을 입력하세요" type="number" />

            <label>날짜</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>참여인 추가</label>
            <input value={newMember} onChange={(e) => setNewMember(e.target.value)} placeholder="참여인 이름" />

            <div className="members-list">
               {members.map((member, index) => (
                  <div key={index} className="member-item">
                     <span>{`참가자 목록 : ${member}`}</span>
                  </div>
               ))}
            </div>

            <div className='button-group'>
               <button type="button" onClick={addMember}>+ 인원 추가</button>
               <button type="button" onClick={saveMeeting}>저장하기</button>
            </div>
         </form>
      </div>
   );
}

export default AddMeetingPage;
