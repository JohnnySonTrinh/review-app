import React from 'react';
import { useHistory } from 'react-router';
import { Dropdown } from 'react-bootstrap';

import styles from '../styles/MoreDropdown.module.css';


const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className='fas fa-ellipsis-v'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className={`ml-auto ${styles.Dropdown}`} drop='left'>
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={`${styles.Dropdown} text-center`}>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleEdit}
          aria-label='edit'
        >
          <i className='fas fa-edit' />
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={handleDelete}
          aria-label='delete'
        >
          <i className='fas fa-trash-alt' />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto ${styles.Absolute}`} drop='left'>
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu className={styles.Dropdown}>
        <Dropdown.Item
        className={styles.DropdownItems}
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label='edit-profile'
        >
          <i className='fas fa-edit' /> Edit profile
        </Dropdown.Item>
        <Dropdown.Item
        className={styles.DropdownItems}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label='edit-username'
        >
          <i className='far fa-id-card' />
          Change username
        </Dropdown.Item>
        <Dropdown.Item
        className={styles.DropdownItems}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label='edit-password'
        >
          <i className='fas fa-key' />
          Change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
