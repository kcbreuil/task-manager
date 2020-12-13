import React, { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Navigation from './Navigation';
import AddTaskModal from '../components/AddTaskModal';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const { tasks, setTasks, loading, setLoading } = useContext(AppContext);

  useEffect(() => {
    axios
      .get('api/tasks', { withCredentials: true })
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [setTasks, loading, setLoading, taskDate, modalShow]);

  useEffect(() => {
    const updateTasks = tasks.map((task) => {
      const title = task.description;
      const date = task.dueDate;
      const color = task.completed ? '#32B679' : '#059CE5';
      return { title, date, color };
    });
    setEvents(updateTasks);
  }, [tasks, loading, setLoading]);

  const handleDateClick = (e) => {
    setTaskDate(e.dateStr);
    console.log(e.dateStr);
    setModalShow(true);
  };

  return (
    <>
      <Navigation />
      <Container>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
        <AddTaskModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          date={taskDate}
        />
      </Container>
    </>
  );
};

export default Calendar;
