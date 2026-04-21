import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 61px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;

  @media (max-width: 576px) {
    .i18n-select {
      display: none;
    }
  }

  .dropdown {
    display: inline-block;
  }

  .user-dropdown {
    padding: 0 24px;
    cursor: pointer;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    > i {
      vertical-align: middle;
      color: @text-color;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    :global(&.dropdown-menu-show) {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .user-dropdown-content {
    display: flex;
    line-height: 18px;
    align-items: center;
  }

  .user-dropdown-avatar {
    margin: 18px 8px 18px 0;
    vertical-align: top;
  }

  .user-dropdown-text {
    display: flex;
    flex-direction: column;
  }

  .user-dropdown-text-tenant {
    font-weight: 500;
    font-size: 12px;
  }

  .header-right {
    display: flex;
  }

  .header-links {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-link-btn {
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    color: #1e293b;
    border-radius: 8px;
    padding: 7px 12px;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .header-link-btn:hover {
    background: #e2e8f0;
  }

  @media (max-width: 576px) {
    .user-dropdown-text {
      display: none;
    }
    .header-link-btn {
      padding: 6px 8px;
      font-size: 12px;
    }
  }
  i {
    padding-right: 10px;
  }
  .menu-toggle-button {
    display: block;
    border: none;
    background-color: transparent;
    font-size: 20px;
    transition: color 0.3s;
    color: rgba(0, 0, 0, 0.85);

    &:hover {
      color: var(--primary-color);
    }
  }
`;

export default HeaderWrapper;
