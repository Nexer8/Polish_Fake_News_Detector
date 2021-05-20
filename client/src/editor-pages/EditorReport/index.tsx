import React, { useState } from 'react';
import styled from 'styled-components';

import { SidebarTemplate } from 'templates/SidebarTemplate';
import { Navigation, NavigationItem } from 'components/Navigation';
import { StatementEvaluation } from 'components/StatementEvaluation';
import { headers } from 'headers';
import { ReturnButton } from 'components/ReturnButton';
import { TextDisplay } from 'components/TextDisplay';
import { Button } from 'components/Button';
import { useHistory } from 'react-router-dom';
import { IReport } from 'models/Report';
import { Icon } from 'components/Icon';
import { StatementData } from 'components/StatementData';
import { Select, DropdownItem } from 'components/Select';
import { Textarea } from 'components/Textarea';
import { COMMENT_FIELD, CATEGORY_FIELD } from 'client-pages/ResultReport';
import { useFormik } from 'formik';
import Routes from 'routes';
import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import bookIcon from 'icons/book.svg';
import infoIcon from 'icons/info.svg';
import cancelIcon from 'icons/close.svg';
import arrowRightIcon from 'icons/arrow-right.svg';
import arrowLeftIcon from 'icons/arrow-left.svg';
import mailIcon from 'icons/mail.svg';
import calendarIcon from 'icons/calendar.svg';
import userIcon from 'icons/user.svg';
import financeIcon from 'icons/finance.svg';
import sendIcon from 'icons/send.svg';

const NAVIGATION_ITEM_REPORT = 'Zgłaszany wynik';
const NAVIGATION_ITEM_DETAILS = 'Szczegóły';
const NAVIGATION_ITEM_REVIEW = 'Recenzja';

interface Props {
  report: IReport;
}

const navigationItems = [
  {
    name: NAVIGATION_ITEM_REPORT,
    icon: eyeIcon,
  },
  {
    name: NAVIGATION_ITEM_DETAILS,
    icon: bookIcon,
  },
  {
    name: NAVIGATION_ITEM_REVIEW,
    icon: penIcon,
  },
];

const Container = styled.div`
  margin-left: 145px;
  max-width: 500px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`;

const StyledHeader = styled.h2`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StyledTextDisplay = styled(TextDisplay)`
  margin-bottom: 50px;
`;

const StyledStamentEvaluation = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 150px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
`;

const StyledDetailsButtons = styled(StyledButtons)`
  margin: 35px 0;
`;

const StyledButtonMargin = styled.div`
  margin-right: 15px;
`;

const StatementDataWrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 15px;
`;

const categories: DropdownItem[] = [
  {
    name: 'Lorem',
  },
  {
    name: 'Ipsum',
  },
];

export const EditorReport: React.FC<Props> = ({ report }) => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);

  const formik = useFormik({
    initialValues: {
      [COMMENT_FIELD]: '',
      [CATEGORY_FIELD]: (null as unknown) as DropdownItem,
    },
    onSubmit: (values) => {
      // TODO: handle submit
      alert(JSON.stringify(values, null, 2));
    },
  });

  const history = useHistory();

  const navigateToReportsList = () => {
    history.push(Routes.editorReports);
  };

  const reportedResult = (
    <>
      <StyledHeader>Podejrzana wypowiedź</StyledHeader>
      <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
        {report.result.statement}
      </StyledTextDisplay>
      <HeaderRow>
        <h2>Ocena wypowiedzi przez model</h2>
        <Icon
          svg={infoIcon}
          hasTooltip={true}
          alt="Werdykt i pewność, z jaką go stwierdzamy"
        />
      </HeaderRow>
      <StyledStamentEvaluation>
        <StatementEvaluation
          probability={report.result.probability}
          verdict={report.result.verdict}
        ></StatementEvaluation>
      </StyledStamentEvaluation>
      <StyledButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              title="Anuluj"
              icon={cancelIcon}
              isFullWidth={true}
              onClick={navigateToReportsList}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button
            type="submit"
            title="Dalej"
            icon={arrowRightIcon}
            isFullWidth={true}
            onClick={() => {
              setNavigationSelectedItem(navigationItems[1]);
            }}
          />
        </ButtonWrapper>
      </StyledButtons>
    </>
  );

  const details = (
    <>
      <StyledHeader>Formularz zgłoszenia</StyledHeader>
      <StatementData
        category="E-mail"
        content={report.reporter}
        icon={mailIcon}
      />
      <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
        {report.result.statement}
      </StyledTextDisplay>
      <StyledHeader>Dodatkowe informacje</StyledHeader>
      {report.politician && (
        <StatementDataWrapper>
          <StatementData
            category="Polityk"
            content={report.politician}
            icon={userIcon}
          />
        </StatementDataWrapper>
      )}
      {report.date && (
        <StatementDataWrapper>
          <StatementData
            category="Data"
            content={report.date}
            icon={calendarIcon}
          />
        </StatementDataWrapper>
      )}
      {report.category && (
        <StatementDataWrapper>
          <StatementData
            category="Kategoria"
            content={report.category}
            icon={financeIcon}
          />
        </StatementDataWrapper>
      )}
      <StyledDetailsButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              title="Anuluj"
              icon={cancelIcon}
              isFullWidth={true}
              onClick={navigateToReportsList}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              title="Wstecz"
              icon={arrowLeftIcon}
              isFullWidth={true}
              onClick={() => {
                setNavigationSelectedItem(navigationItems[0]);
              }}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button
            type="submit"
            title="Dalej"
            icon={arrowRightIcon}
            isFullWidth={true}
            onClick={() => {
              setNavigationSelectedItem(navigationItems[2]);
            }}
          />
        </ButtonWrapper>
      </StyledDetailsButtons>
    </>
  );

  const review = (
    <form onSubmit={formik.handleSubmit}>
      <StyledHeader>Recenzja edytorska</StyledHeader>
      <Select
        items={categories}
        selectedItem={formik.values[CATEGORY_FIELD] as DropdownItem}
        placeholder="Wybierz ocenę wypowiedzi"
        onSelect={(item: DropdownItem) =>
          formik.setFieldValue(CATEGORY_FIELD, item)
        }
      />
      <StyledTextarea
        id={COMMENT_FIELD}
        name={COMMENT_FIELD}
        onChange={formik.handleChange}
        placeholder="Wprowadź komentarz dotyczący zgłoszenia."
        value={formik.values[COMMENT_FIELD].toString()}
      />
      <StyledDetailsButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              title="Anuluj"
              icon={cancelIcon}
              isFullWidth={true}
              onClick={navigateToReportsList}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              title="Wstecz"
              icon={arrowLeftIcon}
              isFullWidth={true}
              onClick={() => {
                setNavigationSelectedItem(navigationItems[1]);
              }}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button
            type="submit"
            title="Wyślij"
            icon={sendIcon}
            isFullWidth={true}
          />
        </ButtonWrapper>
      </StyledDetailsButtons>
    </form>
  );

  return (
    <SidebarTemplate
      headerItems={headers.editor}
      sidebar={
        <Navigation
          items={navigationItems}
          selectedItem={navigationSelectedItem}
          onItemClick={(item: NavigationItem) => {
            setNavigationSelectedItem(item);
          }}
        />
      }
    >
      <Container>
        <ReturnButton
          text="Wróć do wszystkich ogłoszeń"
          path={Routes.editorReports}
        />
        {navigationSelectedItem.name === NAVIGATION_ITEM_REPORT &&
          reportedResult}

        {navigationSelectedItem.name === NAVIGATION_ITEM_DETAILS && details}
        {navigationSelectedItem.name === NAVIGATION_ITEM_REVIEW && review}
      </Container>
    </SidebarTemplate>
  );
};
