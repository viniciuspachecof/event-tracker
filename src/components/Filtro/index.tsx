import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import style from './Filtro.module.scss';

const Filtro: React.FC = () => {

  const [data, setData] = useState('');
  const [completo, setCompleto] = useState(false);
  const [incompleto, setIncompleto] = useState(false);
  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos);

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro: IFiltroDeEventos = {} as IFiltroDeEventos

    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null
    }

    filtro.completo = completo;
    filtro.incompleto = incompleto;

    setFiltroDeEvento(filtro);
  }

  const estiloCompleto = [
    'far',
    'fa-2x',
    completo ? 'fa-check-square' : 'fa-square'
  ]

  const estiloIncompleto = [
    'far',
    'fa-2x',
    incompleto ? 'fa-check-square' : 'fa-square'
  ]

  return (
    <form className={style.Filtro} onSubmit={submeterForm}>
      <h3 className={style.titulo}>Filtrar por data</h3>
      <input
        type="date"
        name="data"
        className={style.input}
        onChange={evento => setData(evento.target.value)}
        placeholder="Por data"
        value={data} />

      <div className={style.statusFiltro}>
        <div className={style.status}>
          <i className={estiloCompleto.join(' ')} onClick={() => setCompleto(!completo)}></i>
          <div className="cards-info">
            <h3 className={style.descricao}>Completo</h3>
          </div>
        </div>

        <div className={style.status}>
          <i className={estiloIncompleto.join(' ')} onClick={() => setIncompleto(!incompleto)}></i>
          <div className="cards-info">
            <h3 className={style.descricao}>Incompleto</h3>
          </div>
        </div>
      </div>

      <button className={style.botao}>
        Filtrar
      </button>

    </form>)
}

export default Filtro