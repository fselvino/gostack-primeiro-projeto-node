import { Router } from 'express';
import { uuid } from 'uuidv4'; // cria um id universal unico
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmetRoutes = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

// array de appointments
const appointments: Appointment[] = [];
// rota de agendamentos

appointmetRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  // formata a data vindo da aplicaçao
  const parseDate = startOfHour(parseISO(date));

  // cria objeto agendamento
  const appointment = {
    id: uuid(),
    provider,
    date: parseDate,
  };

  // faz uma consulta e compara a data persistida com a data vinda da aplicaçao
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parseDate, appointment.date),
  );

  // Se existir a data retorna erro de agendamento.
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ messagem: 'Já existe agendamento para esse horario' });
  }

  // Adiciona agendamento no array
  appointments.push(appointment);
  return response.json(appointment);
});
export default appointmetRoutes;
