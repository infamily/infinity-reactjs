import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default ({ comment, invest }) => {
  const {
    claimed_hours,
    assumed_hours,
    matched,
    donated,
  } = comment;

  
  const total_time = parseFloat(claimed_hours) + parseFloat(assumed_hours);
  const total_money = matched + donated;
  
  const countTotal = () => {
    if (!invest) return total_money;
    if (invest >= total_time) return total_time;
    if (invest >= 0) return invest + total_money;
    return total_money;
  }

  const total = countTotal();
  const need = total_time - total;
  const all = total_money > total_time ? total_money : total_time;

  return(
    <ProgressBar>
      <ProgressBar bsStyle="success" now={total} label={`${total}$h`} key={1} max={all} />
      <ProgressBar bsStyle="warning" now={need} label={`${need.toFixed(2)}h`} key={2} max={all} />
    </ProgressBar>
  );
}