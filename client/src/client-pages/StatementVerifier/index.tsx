import { Button } from 'components/Button';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'constants/headers';
import clipboardIcon from 'icons/clipboard.svg';
import { Textarea } from 'components/Textarea';
import { CharacterCounter } from './CharacterCounter';
import { useAppDispatch } from 'state/hooks';
import { verifyStatement } from 'state/slices/clientSlice';
import { useHistory } from 'react-router';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

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
  const [token, setToken] = useState('');

  const dispatch = useAppDispatch();
  const history = useHistory();

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    value.length > MAX_CHARACTERS_VALUE || value.length === 0
      ? setValid(false)
      : setValid(true);
  }, [value]);

  const handlePasteClick = () => {
    navigator.clipboard.readText().then((text) => setValue(text));
  };

  const handleVerifyClick = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const result = await executeRecaptcha();

    setToken(result);

    dispatch(
      verifyStatement({ statement: value, history, captchaToken: token }),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, executeRecaptcha, value]);

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setToken(token);
    },
    [setToken],
  );

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
        <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
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
