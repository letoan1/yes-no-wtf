import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Players } from './interface';
import AddPage from './pages/AddPage';
import AnswerPage from './pages/AnswerPage';
import ConfirmPage from './pages/ConfirmPage';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/QuestionPage';
import ResultPage from './pages/ResultPage';
import './sass/app.scss';

function App() {
    const [players, setPlayers] = useState<Players[]>(JSON.parse(`${window.localStorage.getItem('players')}`) ?? []);
    const [round, setRound] = useState<number>(0);

    useEffect(() => {
        window.localStorage.setItem('players', JSON.stringify(players));
        window.localStorage.setItem('round', JSON.stringify(round));
    }, [players, round]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-page" element={<AddPage />} />
            <Route path="/create-page" element={<CreatePage players={players} setPlayers={setPlayers} />} />
            <Route
                path="/confirm-page"
                element={<ConfirmPage players={players} setPlayers={setPlayers} round={round} setRound={setRound} />}
            />
            <Route
                path="/question-page"
                element={<QuestionPage round={round} players={players} setPlayers={setPlayers} />}
            />
            <Route
                path="/answer-page"
                element={<AnswerPage round={round} players={players} setPlayers={setPlayers} />}
            />
            <Route path="/result-page" element={<ResultPage players={players} />} />
        </Routes>
    );
}

export default App;
