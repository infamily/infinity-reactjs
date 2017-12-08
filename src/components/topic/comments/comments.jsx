import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, ProgressBar } from 'react-bootstrap';

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();

export default class Comments extends Component {
  constructor() {
    super();

  }

  static propTypes = {
    user: PropTypes.object,
    comments: PropTypes.array.isRequired,
    startToEdit: PropTypes.func.isRequired,
    reply: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };


  render() {
    const { user } = this.props;
    const { comments } = this.props; 
    
    const Buttons = ({ id, owner, need }) => {
      return user && (
        <ButtonGroup bsSize="xsmall">
          {
            user.username === owner
              ? <ButtonGroup bsSize="xsmall">
                  <Button onClick={() => this.props.startToEdit(id)}>&#9998;</Button>
                  <Button onClick={() => this.props.remove(id)}>&#10006;</Button>
                </ButtonGroup>
              : <ButtonGroup bsSize="xsmall">
                  <Button onClick={() => this.props.reply(owner)}>Reply</Button>
                  <Button>Invest {need}$h</Button>
                </ButtonGroup>
          }
        </ButtonGroup>
      );
    }
    
    const Comments = () => comments.map(comment => {
      const { id, text, owner } = comment;
      const content = ReactHtmlParser(mdConverter.makeHtml(text));
      console.log(comment)
      const { 
        claimed_hours,
        assumed_hours,
        matched,
        donated,
        remains,
      } = comment;

      const total_time = parseFloat(claimed_hours) + parseFloat(assumed_hours);
      const total_money = matched + donated;
      const need = total_time - total_money;

      return (
        <div key={id} className="comment__section">
          <div>{content}</div>
          <ProgressBar>
            <ProgressBar bsStyle="success" now={total_money} label={`${total_money}$h`} key={1} max={total_time}/>
            <ProgressBar bsStyle="warning" now={need} label={`${need}h`} key={2} max={total_time} />
          </ProgressBar>
          <Buttons owner={owner} id={id} need={need}/>

          <div className="comment__owner">
            <span>{owner}</span>
          </div>
        </div>
      );
    });

    if (comments.length) {
     return (
        <div>
          <h3>Comments</h3>
         <Comments/>
        </div>
      );
    } else {
      return null;
    }
  }
}