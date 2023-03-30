import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextContainer, StyledDate, DeadlineContainer } from '../../styles/components/PurchaseDeadline.styled';

function PurchaseDeadline() {
  const [deadline, setDeadline] = useState(new Date());
  const deliveryDate = useSelector((state) => state.admin.deliveryDate);
  const [diff, setDiff] = useState(0);
  const dateFormat = { month: 'long', day: 'numeric' };

  useEffect(() => {
    let newDeadline = Date.parse(deliveryDate) - 24 * 3600000;
    newDeadline = new Date(newDeadline);
    setDeadline(prevState => new Date(newDeadline));
    const newDiff = Math.ceil((newDeadline - new Date()) / (24 * 3600000));
    setDiff(prevState => newDiff);
  }, [setDeadline, deliveryDate, setDiff]);

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
