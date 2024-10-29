import './App.css';
import React, { useState } from 'react';
import MainPage from './components/MainPage';
import AddMeetingPage from './components/AddMeetingPage';

function App() {
   const [page, setPage] = useState('main'); // 페이지 전환 상태 ('main' 또는 'addMeeting')
   const [meetings, setMeetings] = useState([]);

   const navigateToMain = () => setPage('main');
   const [selectedMeeting, setSelectedMeeting] = useState(null);
   const navigateToAddMeeting = () => {
      setSelectedMeeting(null);
      setPage('addMeeting');
   };

   // 새로운 모임 추가 함수
   const addMeeting = (meeting) => {
      setMeetings([...meetings, meeting]);
      navigateToMain(); // 모임 추가 후 메인 페이지로 이동
   };
   const onDeleteMeeting = (id) => {
      setMeetings(meetings.filter(meeting => meeting.id !== id));
   };
   const onEditMeeting = (meeting) => {
      setSelectedMeeting(meeting);
      setPage('addMeeting');
   };
   const updateMeeting = (updatedMeeting) => {
      setMeetings(meetings.map(meeting => meeting.id === updatedMeeting.id ? updatedMeeting : meeting));
      navigateToMain();
   };

   return (
      <div className="App">
         {page === 'main' ? (
            <MainPage
               onAddMeetingClick={navigateToAddMeeting}
               meetings={meetings}
               onDeleteMeeting={onDeleteMeeting}
               onEditMeeting={onEditMeeting}
            />
         ) : (
            <AddMeetingPage
               onSaveMeeting={selectedMeeting ? updateMeeting : addMeeting}
               initialData={selectedMeeting}
               onCancel={navigateToMain}
            />
         )}
      </div>
   );
}

export default App;
