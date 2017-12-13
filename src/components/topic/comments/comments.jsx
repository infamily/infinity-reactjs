import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import Transaction from './transaction';
import ProgressBar from './progress_bar';

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
  //   // dev feature
  //   setTimeout(() => this.investState(this.props.comments[0]), 1500)     
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
    
    const Buttons = ({ id, owner, remains, comment }) => {
      return user && (
        <ButtonGroup bsSize="xsmall">
          {
            user.pk === owner.id
              ? <ButtonGroup bsSize="xsmall">
                  <Button onClick={() => this.props.startToEdit(id)}>&#9998;</Button>
                  <Button onClick={() => this.props.remove(id)}>&#10006;</Button>
                </ButtonGroup>
              : <ButtonGroup bsSize="xsmall">
                  <Button onClick={() => this.props.reply(owner.username)}>Reply</Button>
                  {
                    remains 
                    ? <Button onClick={() => this.investState(comment)}>Invest {remains}$h</Button> 
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
        remains
      } = comment;

      const content = ReactHtmlParser(mdConverter.makeHtml(text));

      const Progress = () => (claimed_hours || assumed_hours) ?
        <ProgressBar comment={comment} />
        : null;

      return (
        <div key={id} className="comment__section">
          <div>{content}</div>
          <Progress />
          <Buttons owner={owner} id={id} remains={remains} comment={comment}/>

          <div className="comment__owner">
            <span>{owner.username}</span>
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