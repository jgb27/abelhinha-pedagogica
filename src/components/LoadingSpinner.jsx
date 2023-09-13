import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ loading }) => {
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Cor do spinner
  `;

  return (
    <div>
      <ClipLoader color={'#123abc'} loading={loading} css={override} size={50} />
    </div>
  );
}

export default LoadingSpinner;
