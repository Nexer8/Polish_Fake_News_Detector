import React from 'react';
import { SidebarTemplate } from 'templates/SidebarTemplate';
import { headers } from 'headers';

interface Props {
  // TODO: define props here
}

export const EditorReports: React.FC<Props> = () => {
  return (
    <SidebarTemplate
      headerItems={headers.editor}
      sidebar={<div>TODO: Filters</div>}
    >
      EditorReports
    </SidebarTemplate>
  );
};
