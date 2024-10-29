// MainPage.js
import styled from 'styled-components';
import MeetingCard from './MeetingCard';
const MainContainer = styled.div`
   background-color: wheat;
   display: flex;
   flex-direction: column;
   border: 1px solid #F00;
   max-width: 900px;
   height: 1024px;
   margin: auto;
`;

const AddMeetingButton = styled.button`
   position: fixed;
   bottom: 20px;
   right: 20px;
   background-color: #4CAF50;
   color: white;
   padding: 10px;
   border: none;
   border-radius: 50%;
   font-size: 24px;
`;

function MainPage({ meetings, onAddMeetingClick, onDeleteMeeting, onEditMeeting }) {
   return (
      <MainContainer>
         <header>
         <h1>더치페이 계산기</h1>
         </header>
         <div className="meeting-list">
         {meetings.map((meeting) => (
            <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onDelete={() => onDeleteMeeting(meeting.id)}
            onEdit={() => onEditMeeting(meeting)}/>
         ))}
         </div>
         <AddMeetingButton onClick={onAddMeetingClick}>+ 모임 추가</AddMeetingButton>
      </MainContainer>
   );
}

export default MainPage;
