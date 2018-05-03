import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import Balance from 'components/Balance/Balance';
import UserBalance from 'components/Balance/UserBalance';
import TooltipOverlay from 'components/TooltipOverlay';
import ProgressBar from 'components/TopicProgressBar';
import ClipButton from 'scenes/Topic/ClipButton';
import { makeHtml } from 'services/common.services';
import configs from 'configs';
import TransactionBox from './TransactionBox';
import Transactions from './transactions';
import './comments.css';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments,
      transaction: false,
      invest_comment: {}
    };
  }

  static propTypes = {
    user: PropTypes.object,
    match: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    startToEdit: PropTypes.func.isRequired,
    reply: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.notificationSystem = this.refs.notificationSystem;
    const { commentId } = this.props.match.params;
    const comment =
      commentId && document.getElementById(`comment-${commentId}`);
    if (comment) comment.scrollIntoView();
  }

  componentWillReceiveProps(nextProps) {
    this.props.comments !== nextProps.comments &&
      this.setState({
        comments: nextProps.comments
      });
  }

  investState = comment => {
    this.setState(prevState => ({
      transaction: !prevState.transaction,
      invest_comment: comment
    }));
  };

  updateComments = comment => {
    const { comments } = this.state;
    const updatedList = comments.map(
      item => (item.id === comment.id ? comment : item)
    );

    this.setState({ comments: updatedList });
  };

  getCommentPermaLink = comment => {
    const { id } = this.props.match.params;
    const link = `${configs.getServer()}/topic/${id}/comment/${comment}`;
    return link;
  };

  addNotification = (message, level) => {
    this.refs.notificationSystem.addNotification({
      message,
      level,
      position: 'tc'
    });
  };

  copyToClipboard = async comment => {
    const link = this.getCommentPermaLink(comment);
    try {
      await navigator.clipboard.writeText(link);
      this.addNotification('The link has been copied to clipboard', 'success');
    } catch (error) {
      this.addNotification("The link hasn't been copied", 'error');
    }
  };

  render() {
    const { user } = this.props;
    const { comments, transaction, invest_comment } = this.state;

    const Buttons = ({ id, owner, remains, comment }) =>
      user && (
        <ButtonGroup bsSize="xsmall">
          {user.id === owner.id ? (
            <ButtonGroup bsSize="xsmall">
              <Button onClick={() => this.props.startToEdit(id)}>
                &#9998;
              </Button>
              <Button onClick={() => this.props.remove(id)}>&#10006;</Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup bsSize="xsmall">
              <Button onClick={() => this.props.reply(owner.username)}>
                Reply
              </Button>
              {remains ? (
                <Button onClick={() => this.investState(comment)}>
                  Invest {remains}$h
                </Button>
              ) : null}
            </ButtonGroup>
          )}
        </ButtonGroup>
      );

    const Comments = () =>
      comments.map(comment => {
        const {
          id,
          text,
          owner,
          claimed_hours,
          assumed_hours,
          remains
        } = comment;

        const Progress = () =>
          claimed_hours || assumed_hours ? (
            <ProgressBar comment={comment} />
          ) : null;

        const isOwner = user && user.id === owner.id;
        return (
          <div key={id} id={`comment-${id}`} className="comment__section">
            <div>{makeHtml(text)}</div>
            <Progress />
            <Transactions id={id} />
            <div className="comments__actions">
              <Buttons
                owner={owner}
                id={id}
                remains={remains}
                comment={comment}
              />
              <div className="comment__owner">
                <TooltipOverlay
                  text={this.getCommentPermaLink(id)}
                  placement="bottom"
                >
                  <ClipButton action={() => this.copyToClipboard(id)} />
                </TooltipOverlay>
                <span>{owner.username}</span>
                {isOwner ? (
                  <UserBalance id={owner.id} showQuota={false} />
                ) : (
                  <Balance id={owner.id} />
                )}
              </div>
            </div>
          </div>
        );
      });

    if (comments.length) {
      return (
        <div>
          <h3>Comments</h3>
          <Comments />
          {transaction && (
            <TransactionBox
              state={transaction}
              comment={invest_comment}
              investState={this.investState}
              updateComments={this.updateComments}
            />
          )}
          <NotificationSystem ref="notificationSystem" />
        </div>
      );
    }
    return null;
  }
}
