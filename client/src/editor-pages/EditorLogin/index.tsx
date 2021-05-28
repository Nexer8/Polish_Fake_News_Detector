import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

import { MainTemplate } from 'templates/MainTemplate';
import { headers } from 'constants/headers';
import { EMAIL_FIELD } from 'client-pages/ResultReport';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import mailIcon from 'icons/mail.svg';
import keyIcon from 'icons/key-active.svg';
import logoutIcon from 'icons/logout-active.svg';
import { useAppDispatch } from 'state/hooks';
import { loginAsync } from 'state/slices/editorSlice';
import { useHistory } from 'react-router';

const HEADING: string = 'Logowanie';
const PASSWORD_FIELD: string = 'password';

interface Props {
  // TODO: define props here
}

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

const StyledHeading = styled.h2`
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  width: 150px;
  align-self: flex-end;
  margin-top: 15px;
`;

export const EditorLogin: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      [EMAIL_FIELD]: '',
      [PASSWORD_FIELD]: '',
    },
    onSubmit: (values) => {
      dispatch(
        loginAsync({
          email: values[EMAIL_FIELD],
          password: values[PASSWORD_FIELD],
          history,
        }),
      );
    },
  });

  return (
    <MainTemplate headerItems={headers.login}>
      <Container onSubmit={formik.handleSubmit}>
        <StyledHeading>{HEADING}</StyledHeading>
        <InputWrapper>
          <Input
            icon={mailIcon}
            id={EMAIL_FIELD}
            name={EMAIL_FIELD}
            onChange={formik.handleChange}
            placeholder="E-mail"
            type={EMAIL_FIELD}
            value={formik.values[EMAIL_FIELD].toString()}
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            icon={keyIcon}
            id={PASSWORD_FIELD}
            name={PASSWORD_FIELD}
            onChange={formik.handleChange}
            placeholder="Hasło"
            type={PASSWORD_FIELD}
            value={formik.values[PASSWORD_FIELD].toString()}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            type="submit"
            isFullWidth={true}
            title="Zaloguj"
            icon={logoutIcon}
          />
        </ButtonWrapper>
      </Container>
    </MainTemplate>
  );
};
