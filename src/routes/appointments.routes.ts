import { Router } from 'express';
import { uuid } from 'uuidv4'; // cria um id universal unico

const appointmetRoutes = Router();

interface Appointments {
  provider: string;
  date: Date;
}

// array de appointments
const appointments: Appointments[] = [];
// rota de agendamentos
appointmetRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  // Adiciona agendamento no array
  appointments.push(appointment);
  return response.json(appointments);
});
export default appointmetRoutes;
