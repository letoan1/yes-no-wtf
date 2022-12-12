import { Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Players } from '../interface';
import '../sass/pages/_answer.scss';

interface Props {
    round: number;
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

const AnswerPage: React.FC<Props> = (props) => {
    const { round, players, setPlayers } = props;
    const [result, setResult] = useState<string[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(true);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const listAnswers = async () => {
            const res = await axios.get(`https://yesno.wtf/api`);

            if (res && result.length < round) {
                setResult([...result, res.data.answer.toUpperCase()]);
                setPlayers(
                    players.map((player) => {
                        return {
                            ...player,
                            results: [...result, res.data.answer.toUpperCase()],
                        };
                    }),
                );
                window.localStorage.setItem(
                    'players',
                    JSON.stringify(
                        players.map((player) => {
                            return {
                                ...player,
                                results: [...result, res.data.answer.toUpperCase()],
                            };
                        }),
                    ),
                );
            } else {
                setIsloading(false);
            }
        };

        listAnswers();
    }, [round, players, result, setPlayers]);

    return (
        <div className="answer ">
            <div className="answer-title">
                <h1>Yes No WTF GAME</h1>
                <p className="lucky">Good luck</p>
            </div>
            <div className="answer__player">
                PLAYER: <span style={{ color: 'red' }}>{players[0].name}</span>,{' '}
                <span style={{ color: 'green' }}>{players[1].name}</span>
            </div>
            <div className="answer__round">
                {Array.from(Array(round), (x, index) => index + 1).map((question, index) => (
                    <div className="round-item" key={index}>
                        <span>Round {question}:</span> <br />
                        {isLoading ? (
                            <span>
                                <Skeleton.Input active={active} />
                            </span>
                        ) : (
                            <div className="answer__list">
                                <p className="result">Result: {result[index]}</p>
                                <p className="winner">
                                    Winner:&nbsp;
                                    {players[0].answers[index] === result[index] && (
                                        <span className="text-red">{players[0].name}, </span>
                                    )}
                                    {players[1].answers[index] === result[index] && (
                                        <span className="text-green">{players[1].name}</span>
                                    )}
                                    {players[0].answers[index] !== result[index] &&
                                        players[1].answers[index] !== result[index] && (
                                            <span className="text-empty">empty</span>
                                        )}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {!isLoading ? (
                <Link to="/result-page">
                    <button className="btn btn-summary">Summary</button>
                </Link>
            ) : (
                <>
                    <button className="btn btn-loading">Loading</button>
                </>
            )}
        </div>
    );
};

export default AnswerPage;
