import { selector } from 'recoil';
import { IEvento } from '../../interfaces/IEvento';
import { filtroDeEventos, listaDeEventosState } from '../atom';

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);

    const filtroDataEventos = todosOsEventos.filter((evento) => {
      if (!filtro.data) {
        return true;
      }
      const ehOMesmoDia =
        filtro.data.toISOString().slice(0, 10) ===
        evento.inicio.toISOString().slice(0, 10);

      return ehOMesmoDia;
    });

    const filtroStatusEventos = todosOsEventos.filter((evento) => {
      let eventoCompleto;
      let eventoIncompleto;

      if (!filtro.completo && !filtro.incompleto) {
        return true;
      }

      if (filtro.completo) {
        eventoCompleto = evento.completo === filtro.completo;
      }

      if (filtro.incompleto) {
        eventoIncompleto = evento.completo === !filtro.incompleto;
      }

      return eventoCompleto || eventoIncompleto;
    });

    return filtroDataEventos && filtroStatusEventos;
  },
});

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos');
    const eventosJson: IEvento[] = await respostaHttp.json();

    return eventosJson.map((evento) => ({
      ...evento, 
      inicio: new Date(evento.inicio),
      fim: new Date(evento.fim),
    }))
  },
});
