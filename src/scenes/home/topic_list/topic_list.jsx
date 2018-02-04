import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TopicSection from './TopicSection';
import './topic_list.css'; 

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: props.topics
    }
  }

  static propTypes = {
    topics: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.topics !== nextProps.topics){
      this.setState({
        topics: nextProps.topics
      });
    }
  }

  render() {
    const { user } = this.props;
    const { topics } = this.state;

    const draftStyle = topic => { 
      if (!topic.is_draft) return '';
      if (!user) return 'topic_list__hide';

      const isOwner = topic.owner.username === user.username;
      return isOwner ? 'topic_list__draft' : 'topic_list__hide';
    };

    const EditTopic = ({ owner, id }) => {
      const isOwner = user && (owner === user.username);
      
      return isOwner
        ? <ButtonGroup className="topic_list__edit">
          <Link to={"/edit/" + id + "/"}>
            <Button bsSize="xsmall" className="topic_list__btn">&#9998;</Button>
          </Link>
        </ButtonGroup> 
        : null;
    }

    const List = () =>
      topics.map(topic => (
        <TopicSection
          key={topic.id}
          topic={topic} 
          draftStyle={draftStyle} 
          EditTopic={EditTopic} 
        />
      ));

    return (
      <div className="topics__list">
        <List />
      </div>
    );
  }
}

export default Topics;
