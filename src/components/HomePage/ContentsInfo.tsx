import { Img, Grid, GridItem, Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ContentsInfo = () => {
  return (
    <Wrapper>
      <LogoWrapper>
        <Img src="/images/contentsInfoLogo.svg"></Img>
        <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(3, 1fr)" gap={6}>
          {cardContents.map((content, index) => (
            <GridItem key={index} as={Card}>
              <Text fontSize="lg" fontWeight="bold">
                {content.title}
              </Text>
              <Text>{content.description1}</Text>
              <Text>{content.description2}</Text>
              <Box>{content.image}</Box>
            </GridItem>
          ))}
        </Grid>
      </LogoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  padding: 20px;
  margin-top: 30px;
  height: 320px;
  weight: 380px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(106, 185, 242, 0.3);
  padding: 20px;
  text-align: center;
`;

const cardContents = [
  {
    title: '메일 생성 준비 단 30초!',
    image: <img src="/path/to/image1.png" alt="gif파일1" />,
    description1: '간단한 필수 정보만 입력하면 준비 완료!',
    description2: '사용자 유형에 따라 다른 양식을 제공해요',
  },
  {
    title: 'AI 메일 생성',
    image: <img src="/path/to/image2.png" alt="gif파일2" />,
    description1: '나에게 딱 필요한 메일을 빠르고 정확하게!',
    description2: '입력한 정보를 기반으로 맞춤형 메일을 생성해요.',
  },
  {
    title: '생성한 메일 전송',
    image: <img src="/path/to/image3.png" alt="gif파일3" />,
    description1: '생성된 메일은 간편하게 복붙하거나',
    description2: '바로 전송하며 신속하게 해결해요!',
  },
];