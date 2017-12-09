import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, ProgressBar } from 'react-bootstrap';
import Transaction from './transaction';

import ReactHtmlParser from 'react-html-parser';
import showdown from 'showdown';
var mdConverter = new showdown.Converter();

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: false,
      invest_comment: {}
    }
  }

  static propTypes = {
    user: PropTypes.object,
    comments: PropTypes.array.isRequired,
    startToEdit: PropTypes.func.isRequired,
    reply: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };

  // componentDidMount() {
  //   dev feature
  //   setTimeout(() => this.investState(this.props.comments[0]), 1000)     
  // }

  investState = (comment) => {
    this.setState(prevState => {
      return {
        transaction: !prevState.transaction,
        invest_comment: comment
      }
    });
  }

  render() {
    const { user, comments } = this.props;
    const { transaction, invest_comment } = this.state;
    
    const Buttons = ({ id, owner, need, comment }) => {
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
                  {
                    need 
                    ? <Button onClick={() => this.investState(comment)}>Invest {need}$h</Button> 
                    : null
                  }
                </ButtonGroup>
          }
        </ButtonGroup>
      );
    }
    
    const Comments = () => comments.map(comment => {
      const { 
        id, 
        text, 
        owner,
        claimed_hours,
        assumed_hours,
        matched,
        donated,
      } = comment;

      const content = ReactHtmlParser(mdConverter.makeHtml(text));
      const total_time = parseFloat(claimed_hours) + parseFloat(assumed_hours);
      const total_money = matched + donated;
      const need = total_time - total_money;

      const Progress = () => total_time ?
        <ProgressBar>
          <ProgressBar bsStyle="success" now={total_money} label={`${total_money}$h`} key={1} max={total_time} />
          <ProgressBar bsStyle="warning" now={need} label={`${need}h`} key={2} max={total_time} />
        </ProgressBar>
        : null;

      return (
        <div key={id} className="comment__section">
          <div>{content}</div>
          <Progress />
          <Buttons owner={owner} id={id} need={need} comment={comment}/>

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
          {
           transaction &&
           <Transaction
             state={transaction}
             comment={invest_comment}
             investState={this.investState}
           />
          }
        </div>
      );
    } else {
      return null;
    }
  }
}