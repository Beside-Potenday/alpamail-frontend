import styled from '@emotion/styled';
import { MailInput, mailSendUniv, mailSendBusiness } from '@/types';
import { usePostUniv } from '@/api/hooks/usePostUniv';
import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useMail } from '@/Provider/MailContext';
import { usePostBusiness } from '@/api/hooks/usePostBusiness';

interface ButtonsProps {
  handleListUniv: () => void;
  handleListBusiness: () => void;
  randomInput: MailInput;
}

export const Buttons = ({ handleListUniv, handleListBusiness, randomInput }: ButtonsProps) => {
  const { univMutate, univStatus } = usePostUniv();
  const { businessMutate, businessStatus } = usePostBusiness();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isActive } = useMail();

  const onClose = () => {
    setIsOpen(false);
  };

  const setMailInputUniv = () => {
    setIsOpen(true);

    univMutate(
      { ...(randomInput as unknown as mailSendUniv) },
      {
        onSuccess: (data) => {
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
        },
        onError: (error) => {
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const setMailInputBusiness = () => {
    setIsOpen(true);

    businessMutate(
      { ...(randomInput as unknown as mailSendBusiness) },
      {
        onSuccess: (data) => {
          setTitle(data.title || '메일 생성 성공');
          setContent(data.content || '메일이 성공적으로 생성되었습니다.');
        },
        onError: (error) => {
          setTitle('메일 생성 실패');
          setContent('메일 생성 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const isLoading = univStatus === 'pending' || businessStatus === 'pending';

  return (
    <ButtonsWrapper>
      <ButtonContainer>
        <ExampleButton
          onClick={() => (isActive === 'univ' ? handleListUniv() : handleListBusiness())}
        >
          <ExampleChangeIcon className="example-change-icon" /> 예시 변경
        </ExampleButton>
      </ButtonContainer>
      <ButtonContainer>
        <MailButton
          onClick={() => (isActive === 'univ' ? setMailInputUniv() : setMailInputBusiness())}
        >
          <MakeMailIcon className="make-mail-icon" />
          메일 생성하기
        </MailButton>
      </ButtonContainer>
      <ModalWrapper>
        <StyledModal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          {isLoading ? (
            <SmallModalContent>
              <ModalBody>
                <VideoContainer>
                  <video src="/images/loading.mp4" autoPlay loop muted playsInline>
                    Your browser does not support the video tag.
                  </video>
                  <OverlayImage src="/images/loading.svg" alt="Loading" />
                </VideoContainer>
              </ModalBody>
            </SmallModalContent>
          ) : (
            <LargeModalContent>
              <StyledModalHeader>{title}</StyledModalHeader>
              <StyledModalBody>
                <p>{content}</p>
              </StyledModalBody>
              <ModalFooter>
                <Button colorScheme="blue" onClick={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </LargeModalContent>
          )}
        </StyledModal>
      </ModalWrapper>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  width: 95px;
  height: 265px;
  border-radius: 132.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 20px 0;
  z-index: 2;
  position: absolute;
  top: 60%;
  left: 5%;
  background-clip: padding-box;

  /* Using border and pseudo-element for gradient border */
  border: 1px solid transparent;
  background-image: linear-gradient(white, white), linear-gradient(to right, #6ab9f2, #7a89f0);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExampleChangeIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('/images/exampleChangeIcon.svg');
  background-size: contain; /* 이미지의 크기를 유지하면서 전체를 보여줌 */
  background-position: center; /* 이미지를 중앙에 배치 */
  background-repeat: no-repeat; /* 이미지를 반복하지 않음 */
  transition: background-image 0.3s ease;
`;

const ExampleButton = styled(Button)`
  width: 90px;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #707070;
  font-size: 14px;

  &:hover {
    .example-change-icon {
      background-image: url('/images/exampleChangeIconHover.svg');
    }
  }
`;

const MakeMailIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-image: url('/images/makeMailIcon.svg');
  background-size: contain; /* 이미지의 크기를 유지하면서 전체를 보여줌 */
  background-position: center; /* 이미지를 중앙에 배치 */
  background-repeat: no-repeat; /* 이미지를 반복하지 않음 */
  transition: background-image 0.3s ease;
`;

const MailButton = styled(Button)`
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #707070;
  font-size: 14px;

  &:hover {
    .make-mail-icon {
      background-image: url('/images/makeMailIconHover.svg');
    }
  }
`;

const SmallModalContent = styled(ModalContent)`
  width: auto;
  max-width: 600px;
  height: auto;
  max-height: 800px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 0px 15px 1px rgba(115, 128, 239, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101; /* Ensure the overlay is above the video */
`;

const LargeModalContent = styled(ModalContent)`
  width: auto;
  height: auto;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 0px 15px 1px rgba(115, 128, 239, 0.3);
`;

const VideoContainer = styled.div`
  position: relative; /* Add this line */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  video {
    width: 100%;
    height: auto;
  }
`;

const StyledModalHeader = styled(ModalHeader)`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  white-space: pre-wrap;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;

  .chakra-modal__content-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
