import React, { useState } from 'react';
import { SidebarTemplate } from 'templates/SidebarTemplate';

import eyeIcon from 'icons/eye.svg';
import penIcon from 'icons/pen.svg';
import bookIcon from 'icons/book.svg';
import { Navigation, NavigationItem } from 'components/Navigation';
import { headers } from 'headers';

interface Props {
  // TODO: define props here
}

const navigationItems = [
  {
    name: 'Zgłaszany wynik',
    icon: eyeIcon,
  },
  {
    name: 'Szczegóły',
    icon: bookIcon,
  },
  {
    name: 'Recenzja',
    icon: penIcon,
  },
];

export const EditorReport: React.FC<Props> = () => {
  const [
    navigationSelectedItem,
    setNavigationSelectedItem,
  ] = useState<NavigationItem>(navigationItems[0]);

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
      EditorReport
    </SidebarTemplate>
  );
};
