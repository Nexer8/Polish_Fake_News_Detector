import { Story, Meta } from '@storybook/react';

import { Header, HeaderProps } from 'components/Header/Header';
import checkActive from 'icons/check-active.svg';
import checkInactive from 'icons/check-inactive.svg';
import plusActive from 'icons/plus-active.svg';
import plusInactive from 'icons/plus-inactive.svg';
import infoActive from 'icons/plus-active.svg';
import infoInactive from 'icons/plus-inactive.svg';
import keyActive from 'icons/key-active.svg';
import keyInactive from 'icons/key-inactive.svg';
import flagActive from 'icons/flag.svg';
import flagInactive from 'icons/flag-inactive.svg';
import logoutActive from 'icons/logout-active.svg';
import logoutInactive from 'icons/logout-inactive.svg';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Guest = Template.bind({});
Guest.args = {
  items: [
    {
      path: '#',
      isActive: true,
      text: 'Sprawdź wypowiedź',
      iconActive: plusActive,
      iconInactive: plusInactive,
    },
    {
      path: '#',
      isActive: false,
      text: 'Zweryfikowane wypowiedzi',
      iconActive: checkActive,
      iconInactive: checkInactive,
    },
    {
      path: '#',
      isActive: false,
      text: 'Informacje',
      iconActive: infoActive,
      iconInactive: infoInactive,
    },
  ],
};

export const Login = Template.bind({});
Login.args = {
  items: [
    {
      path: '#',
      isActive: true,
      text: 'Logowanie',
      iconActive: keyActive,
      iconInactive: keyInactive,
    },
  ],
};

export const Admin = Template.bind({});
Admin.args = {
  items: [
    {
      path: '#',
      isActive: true,
      text: 'Zgłoszenia',
      iconActive: flagActive,
      iconInactive: flagInactive,
    },
    {
      path: '#',
      isActive: false,
      text: 'Wyloguj',
      iconActive: logoutActive,
      iconInactive: logoutInactive,
    },
  ],
};
