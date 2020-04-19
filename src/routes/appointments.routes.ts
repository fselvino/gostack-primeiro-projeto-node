import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../model/Appointment';

const appointmetRoutes = Router();

// array de appointments
const appointments: Appointment[] = [];
// rota de agendamentos

appointmetRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  // formata a data vindo da aplicaçao
  const parseDate = startOfHour(parseISO(date));

  // cria objeto agendamento
  const appointment = new Appointment(provider, parseDate);

  // faz uma consulta e compara a data persistida com a data vinda da aplicaçao
  const findAppointmentInSameDate = appointments.find(appoint =>
    isEqual(parseDate, appoint.date),
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
