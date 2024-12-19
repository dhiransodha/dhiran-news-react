import React, { useState } from "react";
import styled from "styled-components";
import { incrementArticleVotes } from "./utils";
import VotesAlert from "./VotesAlert";

// element edited from https://uiverse.io/mahiatlinux/bitter-pug-16

const VoteCard = ({ objToIncrement, typeName }) => {
  // need a global state here with if the user has liked or disliked this post
  const [voteStatus, setVoteStatus] = useState({
    ["like-checkbox"]: false,
    ["dislike-checkbox"]: false,
  });
  const [immediateVoteIncrement, setImmediateVoteIncrement] = useState(0);
  const [isError, setIsError] = useState(false);
  // don't let the user do anything else until the post request has gone through?
  const handleChange = (e) => {
    const otherKey =
      e.target.id === "like-checkbox" ? "dislike-checkbox" : "like-checkbox";
    const incrementArticleVotesNew = (votes) => {
      setIsError(false);
      return incrementArticleVotes(
        objToIncrement[`${typeName}_id`],
        votes
      ).catch(() => {
        setIsError(true);
        setImmediateVoteIncrement((immediateVoteIncrement) => {
          setVoteStatus(() => {
            if (immediateVoteIncrement - votes === 1)
              return {
                ["like-checkbox"]: true,
                ["dislike-checkbox"]: false,
              };
            else if (immediateVoteIncrement - votes === -1)
              return {
                ["like-checkbox"]: false,
                ["dislike-checkbox"]: true,
              };
            else
              return {
                ["like-checkbox"]: false,
                ["dislike-checkbox"]: false,
              };
          });
          return immediateVoteIncrement - votes;
        });
      });
    };
    setVoteStatus(() => {
      if (e.target.checked) {
        if (e.target.id === "like-checkbox") {
          setImmediateVoteIncrement(1);
          if (voteStatus[otherKey]) incrementArticleVotesNew(2);
          else incrementArticleVotesNew(1);
        } else {
          setImmediateVoteIncrement(-1);
          if (voteStatus[otherKey]) incrementArticleVotesNew(-2);
          else incrementArticleVotesNew(-1);
        }
        return { [e.target.id]: true, [otherKey]: false };
      } else {
        setImmediateVoteIncrement(0);
        if (e.target.id === "like-checkbox") incrementArticleVotesNew(-1);
        else incrementArticleVotesNew(1);
        return { ...voteStatus, [e.target.id]: false };
      }
    });
  };

  return (
    <section className="vote-card">
      <StyledWrapper>
        <div className="like-dislike-container">
          <p className="text-content">
            Votes: {objToIncrement.votes + immediateVoteIncrement}
          </p>
          <div className="icons-box">
            <div className="icons">
              <label className="btn-label" htmlFor="like-checkbox">
                <input
                  className="input-box"
                  onChange={handleChange}
                  id="like-checkbox"
                  type="checkbox"
                  checked={voteStatus["like-checkbox"]}
                />
                <svg
                  className="svgs"
                  id="icon-like-solid"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                </svg>
                <svg
                  className="svgs"
                  id="icon-like-regular"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                </svg>
                <div className="fireworks">
                  <div className="checked-like-fx" />
                </div>
              </label>
            </div>
            <div className="icons">
              <label className="btn-label" htmlFor="dislike-checkbox">
                <input
                  className="input-box"
                  id="dislike-checkbox"
                  onChange={handleChange}
                  checked={voteStatus["dislike-checkbox"]}
                  type="checkbox"
                />
                <div className="fireworks">
                  <div className="checked-dislike-fx" />
                </div>
                <svg
                  className="svgs"
                  id="icon-dislike-solid"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                </svg>
                <svg
                  className="svgs"
                  id="icon-dislike-regular"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </StyledWrapper>
      {isError ? <VotesAlert /> : null}
    </section>
  );
};

const StyledWrapper = styled.div`
  .like-dislike-container {
    --primary-blue: #3498db;
    --light-blue: #5dade2;
    --dark-blue: #2980b9;
    --text-color: #ecf0f1;
    --background: linear-gradient(#2c3e50, rgb(100, 100, 101));
    --shadow: 0 5px 15px 0 rgba(52, 152, 219, 0.3);
    --shadow-active: 0 5px 5px 0 rgba(52, 152, 219, 0.5);
    --border-radius-main: 10px;
    --border-radius-icon: 50px;
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    cursor: default;
    color: var(--text-color);
    opacity: 0.9;
    margin: auto;
    padding: 1.5rem;
    font-weight: 600;
    background: var(--background);
    max-width: max-content;
    border-radius: var(--border-radius-main);
    box-shadow: var(--shadow);
    transition: 0.2s ease all;
  }

  .like-dislike-container:hover {
    box-shadow: var(--shadow-active);
  }

  .like-dislike-container .tool-box {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    right: 0;
    border-radius: var(--border-radius-main);
  }

  .like-dislike-container .btn-close {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 0.8rem;
    height: 0.8rem;
    color: transparent;
    font-size: 0;
    cursor: pointer;
    background-color: rgba(231, 76, 60, 0.8);
    border: none;
    border-radius: var(--border-radius-main);
    transition: 0.2s ease all;
  }

  .like-dislike-container .btn-close:hover {
    width: 1rem;
    height: 1rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: rgba(231, 76, 60, 1);
    box-shadow: var(--shadow-active);
  }

  .like-dislike-container .btn-close:active {
    width: 0.9rem;
    height: 0.9rem;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 3px 3px 0 rgba(231, 76, 60, 0.5);
  }

  .like-dislike-container .text-content {
    margin-bottom: 1rem;
    font-size: 18px;
    line-height: 1.6;
    cursor: default;
  }

  .like-dislike-container .icons-box {
    display: flex;
  }

  .like-dislike-container .icons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    margin: 0 0.5rem;
    cursor: pointer;
    user-select: none;
    border: 1px solid var(--light-blue);
    border-radius: var(--border-radius-icon);
    transition: 0.2s ease all;
  }

  .like-dislike-container .icons:hover {
    opacity: 1;
    box-shadow: var(--shadow);
    background-color: var(--light-blue);
  }

  .like-dislike-container .icons:active {
    opacity: 1;
    box-shadow: var(--shadow-active);
    background-color: var(--dark-blue);
  }

  .like-dislike-container .icons .btn-label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
    cursor: pointer;
    position: relative;
  }

  .like-dislike-container .like-text-content {
    border-right: 0.1rem solid var(--light-blue);
    padding: 0 0.6rem 0 0.5rem;
    pointer-events: none;
  }

  .like-dislike-container .dislike-text-content {
    border-left: 0.1rem solid var(--light-blue);
    padding: 0 0.5rem 0 0.6rem;
    pointer-events: none;
  }

  .like-dislike-container .icons .svgs {
    width: 1.3rem;
    fill: var(--text-color);
    box-sizing: content-box;
    padding: 10px 10px;
    transition: 0.2s ease all;
  }

  .like-dislike-container .icons .input-box {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .like-dislike-container .icons #icon-like-regular {
    display: block;
  }

  .like-dislike-container .icons #icon-like-solid {
    display: none;
  }

  .like-dislike-container
    .icons:hover
    :is(#icon-like-solid, #icon-like-regular) {
    animation: rotate-icon-like 0.7s ease-in-out both;
  }

  .like-dislike-container .icons #like-checkbox:checked ~ #icon-like-regular {
    display: none;
    animation: checked-icon-like 0.5s;
  }

  .like-dislike-container .icons #like-checkbox:checked ~ #icon-like-solid {
    display: block;
    animation: checked-icon-like 0.5s;
  }

  .like-dislike-container .icons #icon-dislike-regular {
    display: block;
    transform: rotate(180deg);
  }

  .like-dislike-container .icons #icon-dislike-solid {
    display: none;
    transform: rotate(180deg);
  }

  .like-dislike-container
    .icons:hover
    :is(#icon-dislike-solid, #icon-dislike-regular) {
    animation: rotate-icon-dislike 0.7s ease-in-out both;
  }

  .like-dislike-container
    .icons
    #dislike-checkbox:checked
    ~ #icon-dislike-regular {
    display: none;
    animation: checked-icon-dislike 0.5s;
  }

  .like-dislike-container
    .icons
    #dislike-checkbox:checked
    ~ #icon-dislike-solid {
    display: block;
    animation: checked-icon-dislike 0.5s;
  }

  .like-dislike-container .icons .fireworks {
    transform: scale(0.4);
  }

  .like-dislike-container
    .icons
    #like-checkbox:checked
    ~ .fireworks
    > .checked-like-fx,
  .like-dislike-container
    .icons
    #dislike-checkbox:checked
    ~ .fireworks
    > .checked-dislike-fx {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2,
      0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2, 0 0 #5dade2;
    animation: 1s fireworks-bang ease-out forwards,
      1s fireworks-gravity ease-in forwards,
      5s fireworks-position linear forwards;
    animation-duration: 1.25s, 1.25s, 6.25s;
  }

  .like-dislike-container
    .icons
    #like-checkbox:checked
    ~ .fireworks
    > .checked-like-fx {
    right: 40px;
  }

  .like-dislike-container
    .icons
    #dislike-checkbox:checked
    ~ .fireworks
    > .checked-dislike-fx {
    left: 40px;
  }

  @keyframes rotate-icon-like {
    0%,
    100% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(3deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(-3deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(1deg) translate3d(0, 0, 0);
    }
  }

  @keyframes rotate-icon-dislike {
    0%,
    100% {
      transform: rotate(180deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(183deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(177deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(181deg) translate3d(0, 0, 0);
    }
  }

  @keyframes checked-icon-like {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(-10deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes checked-icon-dislike {
    0% {
      transform: scale(0) rotate(180deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(170deg);
    }
    100% {
      transform: scale(1) rotate(180deg);
    }
  }

  @keyframes fireworks-position {
    0%,
    19.9% {
      margin-top: 10%;
      margin-left: 40%;
    }
    20%,
    39.9% {
      margin-top: 40%;
      margin-left: 30%;
    }
    40%,
    59.9% {
      margin-top: 20%;
      margin-left: 70%;
    }
    60%,
    79.9% {
      margin-top: 30%;
      margin-left: 20%;
    }
    80%,
    99.9% {
      margin-top: 30%;
      margin-left: 80%;
    }
  }

  @keyframes fireworks-gravity {
    to {
      transform: translateY(200px);
      opacity: 0;
    }
  }

  @keyframes fireworks-bang {
    to {
      box-shadow: 114px -107px #3498db, 212px -166px #3498db, 197px -6px #3498db,
        179px -329px #3498db, -167px -262px #3498db, 233px 65px #3498db,
        81px 42px #3498db, -13px 54px #3498db, -60px -183px #3498db,
        127px -259px #3498db, 117px -122px #3498db, 95px 20px #3498db,
        115px 1px #3498db, -160px -328px #3498db, 69px -242px #3498db,
        -208px -230px #3498db, 30px -15px #3498db, 235px -15px #3498db,
        80px -232px #3498db, 175px -173px #3498db, -187px -176px #3498db,
        4px 26px #3498db, 227px -106px #3498db, 119px 17px #3498db,
        -102px 4px #3498db, -16px -4px #3498db, -201px -310px #3498db,
        64px -181px #3498db, -234px -15px #3498db, -184px -263px #3498db;
    }
  }
`;

export default VoteCard;
