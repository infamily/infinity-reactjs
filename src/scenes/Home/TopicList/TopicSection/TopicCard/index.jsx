import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedDate } from 'react-intl';
import PreviewProgressBar from 'components/TopicProgressBar/PreviewProgressBar';
import TopicFundData from 'components/TopicFundData';
import { makePreviewHtml } from 'services/common.services';
import topicService from 'services/topic.service';
import configs from 'configs';
import './TopicCard.css';

const makeHexDim = (inputHex, opacity) => {
  const hex = inputHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const result = `rgba(${r},${g},${b},${opacity / 100})`;
  return result;
};
const getTopicLink = id => `${configs.linkBase()}/split/topic/${id}`;
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
    history: PropTypes.object.isRequired
  };

  goToTopic = e => {
    e.stopPropagation();
    const { history } = this.props;
    const {
      topic: { id }
    } = this.state;
    history.push(getTopicLink(id));
    // this.scrollToCard();
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
    const { title, body, type, created_date } = topic;
    const color = getColor(type);
    const text = makePreviewHtml(body);
    return (
      <div
        id={`card-${topic.id}`}
        className="card__item"
        style={getTitleStyle(color)}
      >
        <div className="card__title" onClick={this.goToTopic}>
          <h4 className="card__title-text">{title}</h4>
        </div>
        <div className="card__data">
          <TopicFundData topic={topic} updateData={this.updateData} />
        </div>
        <div className="card__description" onClick={this.goToTopic}>
          <div className="card__text">{text}</div>
          <br />
          <small>
            <FormattedDate
              value={created_date}
              month="long"
              year="numeric"
              day="numeric"
            />
          </small>
        </div>
        <PreviewProgressBar topic={topic} />
      </div>
    );
  }
}
