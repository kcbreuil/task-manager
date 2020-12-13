import React, { useContext } from 'react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import CompleteButton from './CompleteButton';
import { AppContext } from '../context/AppContext';

const Task = ({ tasks }) => {
  const { search } = useContext(AppContext);

  const filteredTasks = tasks?.filter((task) => {
    return task.description.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <>
      {filteredTasks.map((task) => (
        <tr key={task._id}>
          <td>
            {task.completed ? (
              <strike>{task.description}</strike>
            ) : (
              task.description
            )}
          </td>
          <td>
            {task.dueDate
              ? moment(task.dueDate).format('MMM Do, YYYY')
              : 'No Due Date'}
          </td>
          <td>
            <DeleteButton id={task._id} />
            <CompleteButton task={task} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default Task;
