import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { HEADER_HEIGHT, MainHeader } from './Header/MainHeader';
import { UpperImage } from './UpperImage';

export const Layout = () => {
  return (
    <Wrapper>
      <HeaderPadding />
      <UpperImageWrapper>
        <UpperImage />
      </UpperImageWrapper>
      <HeaderWrapper>
        <MainHeader />
      </HeaderWrapper>
      <InnerWrapper>
        <Outlet />
      </InnerWrapper>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const HeaderPadding = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};
  background-color: #E5EFFF;
`;

const UpperImageWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
`;

const HeaderWrapper = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const InnerWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: transparent;
`;
