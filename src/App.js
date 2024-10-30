import './App.css';
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';

function App() {
   const [page, setPage] = useState('main');
   const [meetings, setMeetings] = useState([]); // 빈 배열로 초기화
   const [selectedMeeting, setSelectedMeeting] = useState(null);

   const navigateToMain = () => setPage('main');
   const navigateToAddMeeting = () => {
      setSelectedMeeting(null);
      setPage('addMeeting');
   };

   const addMeeting = (meeting) => {
      setMeetings([...meetings, meeting]);
      navigateToMain();
   };

   const onDeleteMeeting = (id) => {
      setMeetings(meetings.filter(meeting => meeting.id !== id));
   };

   const onEditMeeting = (meeting) => {
      setSelectedMeeting(meeting);
      setPage('addMeeting');
   };

   const updateMeeting = (updatedMeetings) => { // 직접 updatedMeetings를 받기
      setMeetings(updatedMeetings.filter(meeting => meeting.members.length > 0)); // 비어 있는 모임 삭제
      navigateToMain(); // 수정 후 메인으로 이동
   };

   return (
      <div className="App">
         {page === 'main' ? (
               <MainPage
                  onAddMeetingClick={navigateToAddMeeting}
                  meetings={meetings} // 배열로 props 전달
                  onDeleteMeeting={onDeleteMeeting}
                  onEditMeeting={onEditMeeting}
               />
         ) : (
               <AddMeetingPage
                  onSaveMeeting={updateMeeting}
                  initialData={selectedMeeting}
                  onCancel={navigateToMain}
                  allMeetings={meetings}
                  setMeetings={setMeetings} // 필요시 사용
               />
         )}
      </div>
   );
}

export default App;
