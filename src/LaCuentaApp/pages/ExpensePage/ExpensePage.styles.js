import styled from 'styled-components';

const breakpoints = {
  mobile: '480px',
  landingMobile: '768px',
  desktop: '1024px',
};

export const mobile = `@media (min-width: ${breakpoints.mobile})`;
export const landingMobile = `@media (min-width: ${breakpoints.landingMobile})`;
export const desktop = `@media (min-width: ${breakpoints.desktop})`;


export const Container = styled.div`  

  *{
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  ${mobile} {
    width: 100%;
  }

`