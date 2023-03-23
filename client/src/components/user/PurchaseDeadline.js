import React from 'react';
import { useSelector } from 'react-redux';
import { TextContainer, StyledDate, DeadlineContainer } from '../../styles/components/PurchaseDeadline.styled';

function PurchaseDeadline() {
  const today = new Date();
  const deadline = new Date();
  const deliveryDate = useSelector((state) => state.admin.deliveryDate);
  const dateFormat = { month: 'long', day: 'numeric' };

  deadline.setTime(Date.parse(deliveryDate) - 24 * 3600000);

  const diff = deadline.getDate() - today.getDate();

  return (
    <TextContainer>
      {diff < 0 ? (
        <DeadlineContainer>Deadline has Passed</DeadlineContainer>
      ) : (
        <div>
          <p>
            {diff} day{diff == 1 ? '' : 's'} till
          </p>
          <StyledDate>{deadline.toLocaleDateString('en-US', dateFormat)}</StyledDate>
        </div>
      )}
    </TextContainer>
  );
}

export default PurchaseDeadline;
