import React, { useState } from 'react';
import { SidebarTemplate } from 'templates/SidebarTemplate';

import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import { Navigation, NavigationItem } from 'components/Navigation';

interface Props {
  // TODO: define props here
}

const navigationItems = [
  {
    name: 'Formularz',
    icon: penIcon,
  },
  {
    name: 'Zgłaszany wynik',
    icon: eyeIcon,
  },
];

export const ResultReport: React.FC<Props> = () => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);

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
    >
      ResultReport
    </SidebarTemplate>
  );
};
