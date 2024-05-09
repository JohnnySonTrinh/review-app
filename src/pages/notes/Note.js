import React from 'react'
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from '../../styles/Note.module.css';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { MoreDropdown } from '../../components/MoreDropdown';
import { axiosRes } from '../../api/axiosDefaults';

const Note = (props) => {
  const { profile_id, profile_image, owner, updated_on, content, id, setReview, setNotes } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/notes/${id}/`)
      setReview(prevReview => ({
        results: [{
          ...prevReview.results[0],
          notes_count: prevReview.results[0].notes_count - 1
        }]
      }))

      setNotes(prevNotes => ({
        ...prevNotes,
        results: prevNotes.results.filter(note => note.id !== id),
      }))
    } catch(err){

    }
  }

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
        {is_owner && (
          <MoreDropdown handleEdit={() => {}} handleDelete={handleDelete}/>
        )}
      </Media>
    </div>
  );
};

export default Note