import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import PreviewProgressBar from 'components/TopicProgressBar/PreviewProgressBar';
import TopicFundData from 'components/TopicFundData';
import removeMd from 'remove-markdown';
import topicService from 'services/topic.service';
import configs from 'configs';
import commentsImg from 'images/comments.svg';
import classNames from 'classnames';
import DraggableWrapper from './DraggableWrapper';
import './TopicCard.css';

const makeHexDim = (inputHex, opacity) => {
  const hex = inputHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r},${g},${b},${opacity / 100})`;
  return result;
};

const getColor = type => configs.colors[type];
const getTitleStyle = color => ({
  borderLeft: `3px solid ${makeHexDim(color, 85)}`
});

export default class TopicCard extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: props.topic };
  }

  static propTypes = {
    topic: PropTypes.object.isRequired,
    goToTopic: PropTypes.func.isRequired
  };

  scrollToCard = () => {
    const { topic } = this.state;

    setTimeout(() => {
      const card = document.getElementById(`card-${topic.id}`);
      if (card) {
        card.scrollIntoView();
      }
    }, 1000);
  };

  updateData = async () => {
    const { id } = this.state.topic;
    const newTopic = await topicService.getTopic(id);
    this.setState({ topic: newTopic });
  };

  render() {
    const { topic } = this.state;
    const { goToTopic } = this.props;
    const { title, body, type, created_date } = topic;
    const color = getColor(type);

    const plainBodyText = removeMd(body);
    return (
      <div
        id={`card-${topic.id}`}
        className={classNames('card__item', {
          card__draft: topic.is_draft
        })}
        style={getTitleStyle(color)}
      >
        <DraggableWrapper>
          <div className="card__title" onClick={goToTopic}>
            <h4 className="card__title-text">{title}</h4>
          </div>
          <div className="card__data">
            <TopicFundData topic={topic} updateData={this.updateData} />
          </div>
          <div className="card__description" onClick={goToTopic}>
            <div className="card__text card__font">{plainBodyText}</div>
            <br />
          </div>
          <div className="card__progres">
            <small className="card__date card__font">
              <FormattedDate
                value={created_date}
                month="long"
                year="numeric"
                day="numeric"
              />
              <div className="card__comments">
                <img
                  src={commentsImg}
                  className="card_comment_img"
                  alt="commentIcon"
                />
                <span>{topic.comment_count}</span>
              </div>
            </small>
            <PreviewProgressBar topic={topic} />
          </div>
        </DraggableWrapper>
      </div>
    );
  }
}
