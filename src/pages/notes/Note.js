import React from 'react'
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from '../../styles/Note.module.css';

const Note = (props) => {
  const { profile_id, profile_image, owner, updated_on, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_on}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Note