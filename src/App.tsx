import style from './App.module.scss';
import Card from './components/Card';
import Formulario from './components/Formulario';
import Calendario from './components/Calendario';
import ListaDeEventos from './components/ListaDeEventos';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { DebugObserver } from './components/DebugObserver';
function App() {
    return (
        <RecoilRoot>
            <DebugObserver />
            <div className={style.App}>
                <Suspense fallback="Está carregando">
                    <div className={style.Coluna}>
                        <Card>
                            <Formulario />
                        </Card>
                        <hr />
                        <Card>
                            <ListaDeEventos />
                        </Card>
                    </div>
                    <div className={style.Coluna}>
                        <Calendario />
                    </div>
                </Suspense>
            </div>
        </RecoilRoot>
    );
}

export default App;
