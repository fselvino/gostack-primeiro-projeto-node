import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmetsRepository from '../repositories/AppointmentsRepository';

const appointmetRoutes = Router();
const appointmetRepository = new AppointmetsRepository();

// rota de agendamentos
appointmetRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  // formata a data vindo da aplicaçao
  const parseDate = startOfHour(parseISO(date));

  // realiza a busca por uma data ja agendada
  const findAppointmentInSameDate = appointmetRepository.findByDate(parseDate);

  // Se existir a data retorna erro de agendamento.
  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ messagem: 'Já existe agendamento para esse horario' });
  }

  const appointment = appointmetRepository.create(provider, parseDate);

  return response.json(appointment);
});
export default appointmetRoutes;
