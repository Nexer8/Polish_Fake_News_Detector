import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import { useParams, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { SidebarTemplate } from 'templates/SidebarTemplate';
import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import mailIcon from 'icons/mail.svg';
import userIcon from 'icons/user.svg';
import cancelIcon from 'icons/close.svg';
import sendIcon from 'icons/send.svg';
import { Navigation, NavigationItem } from 'components/Navigation';
import { headers } from 'constants/headers';
import { ReturnButton } from 'components/ReturnButton';
import { TextDisplay } from 'components/TextDisplay';
import { Input } from 'components/Input';
import { Textarea } from 'components/Textarea';
import { DateInput } from 'components/DateInput';
import { DropdownItem, Select } from 'components/Select';
import { Button } from 'components/Button';
import { StatementEvaluation } from 'components/StatementEvaluation';
import Routes from 'routes';
import { useAppSelector, useAppDispatch } from 'state/hooks';
import { selectResult, getResult, sendReport } from 'state/slices/clientSlice';
import { IReport } from 'models/Report';
import categories from 'constants/categories';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const EMAIL_FIELD: string = 'email';
export const COMMENT_FIELD: string = 'comment';
const NAVIGATION_ITEM_FORM: string = 'Formularz';
const NAVIGATION_ITEM_PREVIEW: string = 'Zgłaszany wynik';
const POLITICIAN_FIELD: string = 'politician';
const DATE_FIELD: string = 'date';
export const CATEGORY_FIELD: string = 'category';
const TEXT_DISPLAY_VALUE: string =
  'Wypowiedź wraz z wynikiem oraz uzupełnionymi danymi w formularzu zostanie przekazana do zespołu wykwalifikowanych edytorów. Po ręcznej weryfikacji, zostaniesz powiadomiony o rezultacie na podany adres e-mail. Prosimy, przekaż jak najwięcej informacji, które pomogą w weryfikacji treści sprawdzanej wypowiedzi. Diametralnie ułatwi to pracę naszemu zespołowi.';

const REQUIRED_FIELD_MESSAGE = 'Pole wymagane';
interface Props {}

const navigationItems = [
  {
    name: NAVIGATION_ITEM_FORM,
    icon: penIcon,
  },
  {
    name: NAVIGATION_ITEM_PREVIEW,
    icon: eyeIcon,
  },
];

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const StyledHeading = styled.h2`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledTextDisplay = styled(TextDisplay)`
  margin-top: 0;
  margin-bottom: 50px;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 15px;
`;

const StyledDateInput = styled(DateInput)`
  margin: 15px 0;
`;

const StyledButtons = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: flex-end;
  right: 0;
`;

export const StyledButtonMargin = styled.div`
  margin-right: 15px;
`;

const StyledEvaluationWrapper = styled.div`
  margin: 30px 0;
`;

const StyledFormError = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 20px;
`;

export const ResultReport: React.FC<Props> = () => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);
  const [token, setToken] = useState('');
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const result = useAppSelector(selectResult);
  const dispatch = useAppDispatch();
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (result?.id !== id) {
      dispatch(getResult(id));
    }
  }, [id, result?.id, dispatch]);

  const formik = useFormik({
    initialValues: {
      [EMAIL_FIELD]: '',
      [COMMENT_FIELD]: '',
      [POLITICIAN_FIELD]: '',
      [DATE_FIELD]: '',
      category: categories[0],
    },
    validationSchema: Yup.object({
      [COMMENT_FIELD]: Yup.string().required(REQUIRED_FIELD_MESSAGE),
      [EMAIL_FIELD]: Yup.string()
        .email('Nieprawidłowy adres email')
        .required(REQUIRED_FIELD_MESSAGE),
    }),
    onSubmit: async (values) => {
      if (!executeRecaptcha) {
        return;
      }

      const result = await executeRecaptcha();

      setToken(result);

      dispatch(
        sendReport({
          report: {
            id: id,
            reporter: values[EMAIL_FIELD],
            comment: values[COMMENT_FIELD],
            politician: values[POLITICIAN_FIELD],
            date: values[DATE_FIELD],
            category: values.category.name,
          } as IReport,
          history,
          captchaToken: token,
        }),
      );
    },
  });

  const handleCancel = () => {
    history.push(Routes.statementVerifier);
  };

  const handleReCaptchaVerify = useCallback(
    (token) => {
      setToken(token);
    },
    [setToken],
  );

  return (
    <SidebarTemplate
      sidebar={
        <Navigation
          items={navigationItems}
          selectedItem={navigationSelectedItem}
          onItemClick={(item: NavigationItem) => {
            setNavigationSelectedItem(item);
          }}
        />
      }
      headerItems={headers.client}
    >
      <StyledWrapper>
        <GoogleReCaptcha onVerify={handleReCaptchaVerify} />
        <ReturnButton
          text="Wróć do wyniku"
          path={Routes.result.replace(':id', id)}
        />
        {navigationSelectedItem.name === NAVIGATION_ITEM_FORM && (
          <form onSubmit={formik.handleSubmit}>
            <StyledHeading>Formularz zgłoszenia</StyledHeading>
            <StyledTextDisplay isBgDark>{TEXT_DISPLAY_VALUE}</StyledTextDisplay>
            <Input
              icon={mailIcon}
              id={EMAIL_FIELD}
              name={EMAIL_FIELD}
              onChange={formik.handleChange}
              placeholder="Wprowadź swój adres e-mail"
              type={EMAIL_FIELD}
              value={formik.values[EMAIL_FIELD].toString()}
            />
            <StyledTextarea
              id={COMMENT_FIELD}
              name={COMMENT_FIELD}
              onChange={formik.handleChange}
              placeholder="Wprowadź komentarz dotyczący zgłoszenia."
              value={formik.values[COMMENT_FIELD].toString()}
            />
            {formik.touched && !formik.isValid && (
              <StyledFormError>
                Prawidłowy adres e-mail oraz komentarz są wymagane!
              </StyledFormError>
            )}
            <StyledHeading>Dodatkowe informacje</StyledHeading>
            <Input
              icon={userIcon}
              id={POLITICIAN_FIELD}
              name={POLITICIAN_FIELD}
              onChange={formik.handleChange}
              placeholder="Podaj imię i nazwisko polityka"
              type={POLITICIAN_FIELD}
              value={formik.values[POLITICIAN_FIELD].toString()}
            />
            <StyledDateInput
              className={DATE_FIELD}
              id={DATE_FIELD}
              name={DATE_FIELD}
              onChange={formik.handleChange}
              placeholder="Podaj imię i nazwisko polityka"
              value={formik.values[DATE_FIELD].toString()}
            />
            <Select
              items={categories}
              selectedItem={formik.values[CATEGORY_FIELD] as DropdownItem}
              placeholder="Wybierz kategorię wypowiedzi"
              onSelect={(item: DropdownItem) =>
                formik.setFieldValue(CATEGORY_FIELD, item)
              }
            />
            <StyledButtons>
              <StyledButtonMargin>
                <Button
                  title="Anuluj zgłoszenie"
                  icon={cancelIcon}
                  onClick={handleCancel}
                />
              </StyledButtonMargin>
              <Button type="submit" title="Wyślij zgłoszenie" icon={sendIcon} />
            </StyledButtons>
          </form>
        )}

        {navigationSelectedItem.name === NAVIGATION_ITEM_PREVIEW && result && (
          <>
            <StyledHeading>Podejrzana wypowiedź</StyledHeading>
            <StyledTextDisplay>{result.statement}</StyledTextDisplay>

            <h2>Ocena wypowiedzi przez model</h2>
            <StyledEvaluationWrapper>
              <StatementEvaluation
                probability={result.probability}
                verdict={result.verdict}
              />
            </StyledEvaluationWrapper>
          </>
        )}
      </StyledWrapper>
    </SidebarTemplate>
  );
};
