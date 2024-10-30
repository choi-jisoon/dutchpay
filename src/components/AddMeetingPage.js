import React, { useState, useEffect } from 'react';

function AddMeetingPage({ onSaveMeeting, initialData, onCancel, allMeetings = [] }) {
   const [title, setTitle] = useState(initialData ? initialData.title : '');
   const [amount, setAmount] = useState(initialData ? initialData.amount : '');
   const [date, setDate] = useState(initialData ? initialData.date : '');
   const [members, setMembers] = useState(initialData ? initialData.members : []);
   const [newMember, setNewMember] = useState('');
   const [memberAssignments, setMemberAssignments] = useState({}); // 참가자 이동 관리

   useEffect(() => {
      if (initialData) {
         setTitle(initialData.title);
         setAmount(initialData.amount);
         setDate(initialData.date);
         setMembers(initialData.members);
      }
   }, [initialData]);

   const addMember = () => {
      if (newMember.trim() && !members.includes(newMember.trim())) {
         setMembers([...members, newMember.trim()]);
         setNewMember('');
      }
   };

   const removeLastMember = () => {
      setMembers(members.slice(0, -1));
   };

   const changeMemberMeeting = (member, newMeetingId) => {
      if (newMeetingId) {
         // 이동할 멤버와 새 모임 ID 저장
         setMemberAssignments(prev => ({
            ...prev,
            [member]: newMeetingId,
         }));
      } else {
         // 선택 해제시 해당 멤버 이동 정보 삭제
         setMemberAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[member];
            return newAssignments;
         });
      }
   };

   const saveMeeting = () => {
      if (title && members.length > 0) {
         const meetingData = {
            id: initialData ? initialData.id : Date.now(),
            title,
            amount,
            date,
            members: [], // 모임의 초기 멤버 목록
         };

         // 참가자 이동 처리
         let updatedMeetings = [...allMeetings]; // 모든 모임을 복사

         // 원래 모임에서 멤버 제거
         if (initialData) {
            const originalMeetingIndex = updatedMeetings.findIndex(meeting => meeting.id === initialData.id);
            if (originalMeetingIndex !== -1) {
               const originalMembers = updatedMeetings[originalMeetingIndex].members;

               // 이동된 멤버 목록
               const movedMembers = [];

               for (const [member, newMeetingId] of Object.entries(memberAssignments)) {
                  if (originalMembers.includes(member)) {
                     // 원래 모임에서 멤버 제거
                     updatedMeetings[originalMeetingIndex].members = originalMembers.filter(m => m !== member);

                     // 새 모임 찾기
                     const newMeetingIndex = updatedMeetings.findIndex(meeting => meeting.id === newMeetingId);
                     if (newMeetingIndex !== -1) {
                        // 새 모임에 멤버 추가
                        updatedMeetings[newMeetingIndex].members.push(member);
                        movedMembers.push(member); // 이동한 멤버를 기록
                     }
                  }
               }

               // 이동하지 않은 멤버들만 새로운 모임에 추가
               meetingData.members = members.filter(member => !movedMembers.includes(member));
            }
         } else {
            // 새로운 모임일 경우, 모든 멤버를 추가
            meetingData.members = members;
         }

         // 업데이트된 모임 추가
         updatedMeetings.push(meetingData);

         // 모임 데이터 업데이트
         onSaveMeeting(updatedMeetings); // 모임 저장
         onCancel(); // 저장 후 메인으로 이동
      } else {
         alert("모임명과 최소 한 명 이상의 참여자가 필요합니다.");
      }
   };

   return (
      <div className="add-meeting-page">
         <header>
            <h1>{initialData ? '모임 수정' : '모임 추가'}</h1>
            <button onClick={onCancel}>뒤로 가기</button>
         </header>
         <form onSubmit={(e) => e.preventDefault()}>
            <label>모임명</label>
            <input
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="모임명을 입력하세요"
            />

            <label>지출금액</label>
            <input
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               placeholder="금액을 입력하세요"
               type="number"
            />

            <label>날짜</label>
            <input
               type="date"
               value={date}
               onChange={(e) => setDate(e.target.value)}
            />

            <label>참여인 추가</label>
            <input
               value={newMember}
               onChange={(e) => setNewMember(e.target.value)}
               placeholder="참여인 이름"
            />

            <div className='button-group'>
               <button type="button" onClick={addMember}>+ 인원 추가</button>
               <button type="button" onClick={removeLastMember}>- 인원 삭제</button>
            </div>

            <div className="members-list">
               <h3>참가자 목록</h3>
               {members.map((member, index) => (
                  <div key={index} className="member-item">
                     <span>{member}</span>
                     <select
                        onChange={(e) => changeMemberMeeting(member, e.target.value)}
                        defaultValue=""
                     >
                        <option value="" disabled>모임 선택</option>
                        {allMeetings.map((meeting) => (
                           <option key={meeting.id} value={meeting.id}>
                              {meeting.title}
                           </option>
                        ))}
                     </select>
                  </div>
               ))}
            </div>

            <p>100원 단위 밑으로는 올림 처리 됩니다!</p>
            <div className='button-group'>
               <button type="button" onClick={saveMeeting}>저장하기</button>
            </div>
         </form>
      </div>
   );
}

export default AddMeetingPage;
