import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SidebarTemplate } from 'templates/SidebarTemplate';
import { Navigation, NavigationItem } from 'components/Navigation';
import {
  StatementEvaluation,
  VerdictType,
} from 'components/StatementEvaluation';
import { headers } from 'headers';
import { ReturnButton } from 'components/ReturnButton';
import { TextDisplay } from 'components/TextDisplay';
import { Button } from 'components/Button';
import { useHistory, useParams } from 'react-router-dom';
import { Icon } from 'components/Icon';
import { StatementData } from 'components/StatementData';
import { Select, DropdownItem } from 'components/Select';
import { Textarea } from 'components/Textarea';
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
import { useAppDispatch, useAppSelector } from 'state/hooks';
import {
  selectCurrentReport,
  fetchReportAsync,
  reviewAsync,
} from 'state/slices/editorSlice';

const NAVIGATION_ITEM_REPORT = 'Zgłaszany wynik';
const NAVIGATION_ITEM_DETAILS = 'Szczegóły';
const NAVIGATION_ITEM_REVIEW = 'Recenzja';
const VERDICT_FIELD = 'verdict';
const COMMENT_FIELD = 'comment';

interface Props {}

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

const validate = (values: any) => {
  const errors: { comment?: string } = {};

  if (!values.comment) {
    errors.comment = 'Komentarz jest wymagany';
  }

  return errors;
};

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

const StyledFormError = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.colors.red};
`;

const verdicts: DropdownItem[] = [
  {
    name: VerdictType.TRUTH,
    isGreen: true,
  },
  {
    name: VerdictType.FAKE,
    isRed: true,
  },
];

export const EditorReport: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const report = useAppSelector(selectCurrentReport);

  const history = useHistory();

  const { id: idParam } = useParams<{ id: string }>();

  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);

  useEffect(() => {
    if (report?.id !== idParam) {
      dispatch(fetchReportAsync(idParam));
    }
  }, [dispatch, report?.id, idParam]);

  const formik = useFormik({
    initialValues: {
      comment: '',
      verdict: verdicts[0],
    },
    validate,
    onSubmit: (values) => {
      if (report) {
        dispatch(
          reviewAsync({
            reportId: report.id,
            comment: values.comment,
            verdict: values.verdict.name as VerdictType,
            history,
          }),
        );
      }
    },
  });

  const navigateToReportsList = () => {
    history.push(Routes.editorReports);
  };

  const reportedResult = report && (
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

  const details = report && (
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
        items={verdicts}
        selectedItem={formik.values.verdict}
        placeholder="Wybierz ocenę wypowiedzi"
        onSelect={(item: DropdownItem) =>
          formik.setFieldValue(VERDICT_FIELD, item)
        }
      />
      <StyledTextarea
        id={COMMENT_FIELD}
        name={COMMENT_FIELD}
        onChange={formik.handleChange}
        placeholder="Wprowadź komentarz dotyczący zgłoszenia."
        value={formik.values.comment}
      />
      {formik.touched && formik.errors.comment ? (
        <StyledFormError>{formik.errors.comment}</StyledFormError>
      ) : null}
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
