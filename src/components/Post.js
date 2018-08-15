import React, {Component} from 'react';
import styled from 'styled-components';
import thumbUp from '../icons/thumb-up-button.svg';
import thumbDown from '../icons/thumb-down-button.svg';
import thumbEdit from '../icons/edit.svg';
import thumbDelete from '../icons/delete.svg';
import { printDate } from '../utils/helpers';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import { 
  REQUEST_POST_SCORE, 
  FETCH_DELETE_POST,
  WATCH_TOGGLE_EDIT_POST_MODAL
} from '../sagas/posts';

const PostContent = styled.div`
  border-top: 1px solid #f2af1e;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Title = styled.h1``;

const DivActions = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ActionDiv = styled.div`
  display: flex;
  padding-right: 10px;
`;

const SpanImg = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 16px;
  cursor: pointer;
`;

const Author = styled.p`
  color: #a1a1a1;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 110%;
  font-style: italic;
`;

const CategoryLink = styled(Link)`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-weight: 400;
  line-height: 32px;
  padding-left: 12px;
  padding-right: 12px;
  user-select: none;
  white-space: nowrap;
`;

class Post extends Component {
  onUpvote = () => {
    const { post, postScore } = this.props;
  
    postScore(post.id, 'upVote');
  };

  onDownvote = () => {
    const { post, postScore } = this.props;
    
    postScore(post.id, 'downVote');
  };

  onDelete = () => {
    const { post, deletePost } = this.props;

    deletePost(post.id);
  }

  onEdit = () => {
    const { post, toggleEditPostModal } = this.props;

    toggleEditPostModal(post);
  };

  render() {
    const {post} = this.props;
    const {title, category, author, timestamp, voteScore} = post;

    return (
      <PostContent>
        <Title>{title}</Title>
        <CategoryLink to={`/${category}`}>{category}</CategoryLink>
        <Author>By {author} under {category} on {printDate(timestamp)}</Author>

        <DivActions>
          <ActionDiv><SpanImg img={thumbUp} onClick={this.onUpvote} /></ActionDiv>
          <ActionDiv><SpanImg img={thumbDown} onClick={this.onDownvote} /></ActionDiv>
          <ActionDiv><span>{voteScore}</span></ActionDiv>
          <ActionDiv><SpanImg img={thumbEdit} onClick={this.onEdit} />Editar</ActionDiv>
          <ActionDiv><SpanImg img={thumbDelete} onClick={this.onDelete} />Deletar</ActionDiv>
        </DivActions>
      </PostContent>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postScore: (postId, option) => dispatch({type: REQUEST_POST_SCORE, postId, option}),
    deletePost: post => dispatch({ type: FETCH_DELETE_POST, post }),
    toggleEditPostModal: post => dispatch({ type: WATCH_TOGGLE_EDIT_POST_MODAL, post }),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));