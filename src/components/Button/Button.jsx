import React from 'react';
import { LoadButton } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadmore }) => {
  return (
    <LoadButton type="button" onClick={() => onLoadmore()}>
      Load More
    </LoadButton>
  );
};


Button.propTypes = {
  onLoadmore: PropTypes.func,
}