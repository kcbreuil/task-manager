import React, { useContext, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import Task from './Task';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import Search from './Search';
import swal from 'sweetalert';

const TaskList = () => {
  const {
    setTasks,
    search,
    filteredTasks,
    setFilteredTasks,
    loading
  } = useContext(AppContext);

  useEffect(() => {
    axios
      .get('/api/tasks?sortBy=dueDate:asc', { withCredentials: true })
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => {
        swal(`Oops!`, 'Something went wrong.');
      });
  }, [setTasks, setFilteredTasks, search, loading]);

  return (
    <Container>
      <Search />
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Due Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Task tasks={filteredTasks} />
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
