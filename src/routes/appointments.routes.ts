import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmetRoutes = Router();

interface Appointments {
  provider: string;
  date: Date;
}
const appointments: Appointments[] = [];
appointmetRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);
  return response.json(appointments);
});
export default appointmetRoutes;
