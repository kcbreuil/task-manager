import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import swal from 'sweetalert';

const CompleteButton = ({ task }) => {
  const { setLoading } = useContext(AppContext);

  // Renders a button that will toggle from true to false
  const toggleComplete = async () => {
    setLoading(true);
    try {
      await axios({
        method: 'PUT',
        url: `/api/tasks/${task._id}`,
        withCredentials: true,
        data: { completed: !task.completed }
      });
      swal('Updated', 'Your task has been updated!', 'success');
      setLoading(false);
    } catch (error) {
      swal(`Oops!`, 'Something went wrong.');
    }
  };

  return (
    <Button
      className="mr-2"
      style={{ width: 150 }}
      variant={task.completed ? 'success' : 'secondary'}
      onClick={toggleComplete}
    >
      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
    </Button>
  );
};

export default CompleteButton;
