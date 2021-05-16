import React, { useState } from 'react';
import styled from 'styled-components';

import { SidebarTemplate } from 'templates/SidebarTemplate';
import { Navigation, NavigationItem } from 'components/Navigation';
import { StatementEvaluation } from 'components/StatementEvaluation';
import { StyledButtonMargin } from 'client-pages/ResultReport';
import { headers } from 'headers';
import { ReturnButton } from 'components/ReturnButton';
import { TextDisplay } from 'components/TextDisplay';
import { Button } from 'components/Button';
import { IResult } from 'models/Result';
import { Icon } from 'components/Icon';
import { StatementData } from 'components/StatementData';
import { Select } from 'components/Select';
import { Textarea } from 'components/Textarea';
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

const NAVIGATION_ITEM_REPORT = 'Zgłaszany wynik';
const NAVIGATION_ITEM_DETAILS = 'Szczegóły';
const NAVIGATION_ITEM_REVIEW = 'Recenzja';

interface Props extends IResult {}

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

const StatementDataWrapper = styled.div`
  margin-bottom: 15px;
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 15px;
`;

export const EditorReport: React.FC<Props> = ({
  statement,
  verdict,
  probability,
}) => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);

  const reportedResult = (
    <>
      <StyledHeader>Podejrzana wypowiedź</StyledHeader>
      <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
        {statement}
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
          probability={probability}
          verdict={verdict}
        ></StatementEvaluation>
      </StyledStamentEvaluation>
      <StyledButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button title="Anuluj" icon={cancelIcon} isFullWidth={true} />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button
            type="submit"
            title="Dalej"
            icon={arrowRightIcon}
            isFullWidth={true}
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
        content="lorem.ipsum@gmail.com"
        icon={mailIcon}
      />
      <StyledTextDisplay isBgDark={false} isBiggerFont={true}>
        {statement}
      </StyledTextDisplay>
      <StyledHeader>Dodatkowe informacje</StyledHeader>
      <StatementDataWrapper>
        <StatementData
          category="Polityk"
          content="lorem.ipsum@gmail.com"
          icon={userIcon}
        />
      </StatementDataWrapper>
      <StatementDataWrapper>
        <StatementData
          category="Data"
          content="lorem.ipsum@gmail.com"
          icon={calendarIcon}
        />
      </StatementDataWrapper>
      <StatementDataWrapper>
        <StatementData
          category="Kategoria"
          content="lorem.ipsum@gmail.com"
          icon={financeIcon}
        />
      </StatementDataWrapper>
      <StyledDetailsButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button title="Anuluj" icon={cancelIcon} isFullWidth={true} />
          </ButtonWrapper>
        </StyledButtonMargin>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              type="submit"
              title="Dalej"
              icon={arrowRightIcon}
              isFullWidth={true}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button title="Wstecz" icon={arrowLeftIcon} isFullWidth={true} />
        </ButtonWrapper>
      </StyledDetailsButtons>
    </>
  );

  const review = (
    <>
      <StyledHeader>Recenzja edytorska</StyledHeader>
      <Select
        items={[]}
        placeholder="Wybierz ocenę  wypowiedzi"
        onSelect={() => {}}
      />
      <StyledTextarea placeholder="Wprowadź uzasadnienie wybranej oceny wypowiedzi." />
      <StyledDetailsButtons>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button title="Anuluj" icon={cancelIcon} isFullWidth={true} />
          </ButtonWrapper>
        </StyledButtonMargin>
        <StyledButtonMargin>
          <ButtonWrapper>
            <Button
              type="submit"
              title="Dalej"
              icon={arrowRightIcon}
              isFullWidth={true}
            />
          </ButtonWrapper>
        </StyledButtonMargin>
        <ButtonWrapper>
          <Button title="Wstecz" icon={arrowLeftIcon} isFullWidth={true} />
        </ButtonWrapper>
      </StyledDetailsButtons>
    </>
  );

  const [displayedItem, setDisplayedItem] = useState(reportedResult);

  return (
    <SidebarTemplate
      headerItems={headers.editor}
      sidebar={
        <Navigation
          items={navigationItems}
          selectedItem={navigationSelectedItem}
          onItemClick={(item: NavigationItem) => {
            setNavigationSelectedItem(item);
            if (item.name === NAVIGATION_ITEM_REPORT) {
              setDisplayedItem(reportedResult);
            } else if (item.name === NAVIGATION_ITEM_DETAILS) {
              setDisplayedItem(details);
            } else if (item.name === NAVIGATION_ITEM_REVIEW) {
              setDisplayedItem(review);
            }
          }}
        />
      }
    >
      <Container>
        <ReturnButton
          text="Wróć do wszystkich ogłoszeń"
          path={Routes.editorReports}
        />
        {displayedItem}
      </Container>
    </SidebarTemplate>
  );
};
