import { Button } from 'components/Button';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'headers';
import clipboardIcon from 'icons/clipboard.svg';
import { Textarea } from 'components/Textarea';
import { CharacterCounter } from './CharacterCounter';
import { useAppDispatch } from 'state/hooks';
import { verifyStatement } from 'state/slices/clientSlice';

const HEADING: string = 'Sprawdź wypowiedź';
const MAX_CHARACTERS_VALUE: number = 1000;
const PASTE_BUTTON_TITLE: string = 'Wklej treść';
const PLACEHOLDER_VALUE: string =
  'Wprowadź, bądź wklej treść wiadomości do zweryfikowania.';
const VERIFY_BUTTON_TITLE: string = 'Zweryfikuj';

interface Props {}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 30px;
`;

const StyledFooter = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const StatementVerifier: React.FC<Props> = () => {
  const [value, setValue] = useState<string>('');
  const [isValid, setValid] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    value.length > MAX_CHARACTERS_VALUE || value.length === 0
      ? setValid(false)
      : setValid(true);
  }, [value]);

  const handlePasteClick = () => {
    navigator.clipboard.readText().then((text) => setValue(text));
  };

  const handleVerifyClick = () => {
    // TODO: button should be disabled when isValid === false
    dispatch(verifyStatement(value));
  };

  return (
    <MainTemplate headerItems={headers.client}>
      <StyledWrapper>
        <StyledHeader>
          <h2>{HEADING}</h2>
          <Button
            title={PASTE_BUTTON_TITLE}
            icon={clipboardIcon}
            onClick={handlePasteClick}
          />
        </StyledHeader>
        <StyledTextarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={PLACEHOLDER_VALUE}
        ></StyledTextarea>
        <StyledFooter>
          <CharacterCounter
            currentCount={value.length}
            isValid={isValid}
            maxCharacters={MAX_CHARACTERS_VALUE}
          />
          <Button
            isDisabled={!isValid}
            title={VERIFY_BUTTON_TITLE}
            icon={clipboardIcon}
            onClick={handleVerifyClick}
          />
        </StyledFooter>
      </StyledWrapper>
    </MainTemplate>
  );
};
