import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';

const permissions = Permissions.values;

export default [
  {
    id: '0',
    path: '/',
    exact: true,
    icon: 'fas fa-home',
    label: i18n('dashboard.menu'),
    className: 'menu-li side-menue',
    permissionRequired: permissions.userRead,
  },
  {
    id: '1',
    path: '/user',
    exact: true,
    icon: 'fas fa-users',
    label: 'Users',
    className: 'menu-li side-menue',
    permissionRequired: permissions.userRead,
  },
].filter(Boolean);