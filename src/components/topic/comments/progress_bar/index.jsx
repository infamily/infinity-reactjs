import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default ({ comment, invest }) => {
  const {
    claimed_hours,
    assumed_hours,
    matched,
    donated,
    remains
  } = comment;

  if (!remains) return null;

  const total_time = parseFloat(claimed_hours) + parseFloat(assumed_hours);
  const total_money = matched + donated;
  
  const countTotal = () => {
    if (!invest) return total_money;
    if (invest >= 0) return invest + total_money;
    return total_money;
  }

  const total = countTotal();
  const need = total_time - total;
  const all = total > total_time ? total : total_time;
  const overpay = total > total_time ? (total - total_time) : 0;
  const pay = total - overpay;

  return(
    <ProgressBar>
      <ProgressBar bsStyle="success" now={pay} label={`${pay}$h`} key={1} max={all} />
      <ProgressBar bsStyle="warning" now={need} label={`${need.toFixed(2)}h`} key={2} max={all} />
      <ProgressBar bsStyle="success" active now={overpay} label={`${overpay.toFixed(2)}$h overpay`} key={3} max={all} />
    </ProgressBar>
  );
}