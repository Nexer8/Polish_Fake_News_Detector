import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { SidebarTemplate } from 'templates/SidebarTemplate';
import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import mailIcon from 'icons/mail.svg';
import userIcon from 'icons/user.svg';
import cancelIcon from 'icons/close.svg';
import sendIcon from 'icons/send.svg';
import { Navigation, NavigationItem } from 'components/Navigation';
import { headers } from 'headers';
import { ReturnButton } from 'components/ReturnButton';
import { TextDisplay } from 'components/TextDisplay';
import { Input } from 'components/Input';
import { Textarea } from 'components/Textarea';
import { DateInput } from 'components/DateInput';
import { DropdownItem, Select } from 'components/Select';
import { Button } from 'components/Button';
import {
  StatementEvaluation,
  VerdictType,
} from 'components/StatementEvaluation';
import { Alert, AlertType } from 'components/Alerts/Alert';

export const EMAIL_FIELD: string = 'email';
export const COMMENT_FIELD: string = 'comment';
const NAVIGATION_ITEM_FORM: string = 'Formularz';
const NAVIGATION_ITEM_PREVIEW: string = 'Zgłaszany wynik';
const POLITICIAN_FIELD: string = 'politician';
const DATE_FIELD: string = 'date';
export const CATEGORY_FIELD: string = 'category';
const TEXT_DISPLAY_VALUE: string =
  'Wypowiedź wraz z wynikiem oraz uzupełnionymi danymi w formularzu zostanie przekazana do zespołu wykwalifikowanych edytorów. Po ręcznej weryfikacji, zostaniesz powiadomiony o rezultacie na podany adres e-mail. Prosimy, przekaż jak najwięcej informacji, które pomogą w weryfikacji treści sprawdzanej wypowiedzi. Diametralnie ułatwi to pracę naszemu zespołowi.';

interface Props {
  // TODO: define props here
}

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

// TODO: provide valid categories (prossibly fetch from backend)
const categories: DropdownItem[] = [
  {
    name: 'Lorem',
  },
  {
    name: 'Ipsum',
  },
  {
    name: 'Dolor Sit',
  },
  {
    name: 'Amet',
  },
  {
    name: 'Ars bene moriendi',
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
  margin-bottom: 20px;
`;

const StyledDateInput = styled(DateInput)`
  margin: 15px 0;
`;

const StyledButtons = styled.div`
  margin: 30px 0;
  display: flex;
  position: absolute;
  right: 0;
`;

export const StyledButtonMargin = styled.div`
  margin-right: 15px;
`;

const StyledEvaluationWrapper = styled.div`
  margin: 30px 0;
`;

interface ShowAlert {
  show: boolean;
  type: AlertType;
  message: string;
}

export const ResultReport: React.FC<Props> = () => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);
  const [showAlert, setShowAlert] = useState<ShowAlert>({
    show: false,
    type: AlertType.SUCCESS,
    message: '',
  });
  const { id } = useParams<{ id: string }>();

  const formik = useFormik({
    initialValues: {
      [EMAIL_FIELD]: '',
      [COMMENT_FIELD]: '',
      [POLITICIAN_FIELD]: '',
      [DATE_FIELD]: '',
      [CATEGORY_FIELD]: (null as unknown) as DropdownItem,
    },
    onSubmit: async (values) => {
      const { email, comment, politician, date } = values;
      try {
        const response = await axios.post(
          `http://127.0.0.1:3001/api/client/report/${id}`,
          {
            reporter: email,
            comment,
            politician,
            date,
            // TODO
            category: 'Polityka',
          },
        );
        if (response.status === 200) {
          setShowAlert({
            show: true,
            type: AlertType.SUCCESS,
            message: 'Formularz wysłany',
          });
        } else {
          setShowAlert({
            show: true,
            type: AlertType.ERROR,
            message: 'Wystąpił błąd podczas wysyłania',
          });
        }
      } catch (err) {
        // else nie łapie 500
        setShowAlert({
          show: true,
          type: AlertType.ERROR,
          message: 'Wystąpił błąd podczas wysyłania',
        });
      }
    },
  });

  const handleCancel = () => {
    // TODO: handle cancel click
  };

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
        <ReturnButton text="Wróć do wyniku" path="TODO: provide path" />
        {showAlert.show && (
          <Alert
            id="pocototutaj"
            type={showAlert.type}
            message={showAlert.message}
            onCloseClick={() => {}}
          />
        )}
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

        {navigationSelectedItem.name === NAVIGATION_ITEM_PREVIEW && (
          <>
            <StyledHeading>Podejrzana wypowiedź</StyledHeading>
            <StyledTextDisplay>TODO: Statement text</StyledTextDisplay>

            <h2>Ocena wypowiedzi przez model</h2>
            <StyledEvaluationWrapper>
              <StatementEvaluation
                probability={70}
                verdict={VerdictType.FAKE}
              />
            </StyledEvaluationWrapper>
          </>
        )}
      </StyledWrapper>
    </SidebarTemplate>
  );
};
