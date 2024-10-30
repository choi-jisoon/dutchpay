import styled from 'styled-components';
import MeetingCard from './MeetingCard';

const MainContainer = styled.div`
   background-color: wheat;
   display: flex;
   flex-direction: column;
   border: 1px solid #F00;
   max-width: 900px;
   min-height: 800px;
   max-height: auto;
   margin: auto;
   top: auto;
   position: relative; /* Add this for positioning child elements */
`;

const AddMeetingButton = styled.button`
   position: absolute; /* Position relative to MainContainer */
   top: 25px; /* Adjust positioning to place it in the lower right corner */
   right: 30px;
   background-color: #000;
   color: white;
   padding: 10px;
   border: none;
   border-radius: 50%;
   font-size: 20px;
   cursor: pointer;
   font-family: 'Pretendard', sans-serif;
`;

function MainPage({ meetings, onAddMeetingClick, onDeleteMeeting, onEditMeeting }) {
   return (
      <MainContainer>
         <header>
            <h1>더치페이 계산기</h1>
         </header>
         <div className="meeting-list">
            {meetings && meetings.length > 0 ? ( // meetings가 존재하고 길이가 0보다 클 때만 map
               meetings.map((meeting) => (
                  <MeetingCard
                     key={meeting.id}
                     meeting={meeting}
                     onDelete={() => onDeleteMeeting(meeting.id)}
                     onEdit={() => onEditMeeting(meeting)}
                  />
               ))
            ) : (
               <p>등록된 모임이 없습니다.</p> // 모임이 없을 경우 메시지 표시
            )}
         </div>
         <AddMeetingButton onClick={onAddMeetingClick}>+ 모임 추가</AddMeetingButton>
      </MainContainer>
   );
}

export default MainPage;
