import styled from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useEffect, useLayoutEffect, useRef } from 'react';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  const popupRef = useRef(null);

  function togglePopup(e) {
    if (e.currentTarget !== e.target) {
      return;
    }

    setSettings((prevState) => ({
      ...prevState,
      visible: !prevState.visible
    }));
  }

  function handleClickOutside(e) {
    if (!popupRef.current.contains(e.target)) {
      togglePopup(e);
    }
  }

  function handleKeyUp(e) {
    const keys = {
      27: () => {
        e.preventDefault();
        setSettings((prevState) => ({
          ...prevState,
          visible: false
        }));
        window.removeEventListener('keyup', handleKeyUp, false);
      }
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  }

  useEffect(() => {
    if (visible) {
      window.addEventListener('keyup', handleKeyUp, false);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keyup', handleKeyUp, false);
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('padding-right');
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useLayoutEffect(() => {
    if (visible) {
      if (window.innerWidth && document.body.clientWidth) {
        document.body.style.paddingRight =
          document.body.scrollHeight !== window.innerHeight
            ? `${window.innerWidth - document.body.clientWidth}px`
            : '0';
      }
    }
  }, [visible]);

  return (
    <PopupContainer visible={visible} onClick={handleClickOutside}>
      <StyledPopup ref={popupRef}>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visible 0.3s;

  ${({ visible }) =>
    visible &&
    `
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${window.screen.width < 930 && 'width: 80%'};
  ${window.screen.width < 600 && 'width: 95%'};
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  ${window.screen.width < 930 && 'right: calc(10% - 10px)'};
  ${window.screen.width < 600 && 'right: calc(3% - 10px)'};
`;
