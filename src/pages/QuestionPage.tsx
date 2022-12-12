import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Players } from '../interface';
import '../sass/pages/_question.scss';

interface Props {
    round: number;
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

const QuestionPage: React.FC<Props> = (props) => {
    const { round, players, setPlayers } = props;
    const navigate = useNavigate();
    const [turn, setTurn] = useState<number>(JSON.parse(`${window.localStorage.getItem('turn')}`) ?? 0);
    const [answerList, setAnswerList] = useState<string[]>(Array(round).fill('EMPTY'));

    const submitAnswer = () => {
        if (turn === 0) {
            setTurn(1);
            setAnswerList(players[0].answers ?? Array(round).fill('EMPTY'));
            window.localStorage.setItem('players', JSON.stringify(players));
            window.localStorage.setItem('turn', JSON.stringify(1));
        } else {
            setAnswerList(players[1].answers ?? Array(round).fill('EMPTY'));
            window.localStorage.setItem('players', JSON.stringify(players));
            navigate('/answer-page');
        }
    };

    const handleChooseYes = (item: number) => {
        const answer = answerList.map((answer, index) => {
            if (index === item) {
                if (answerList[item] !== 'YES') {
                    return 'YES';
                } else {
                    return 'EMPTY';
                }
            } else {
                return answer;
            }
        });

        setAnswerList(answer);
    };

    const handleChooseNo = (item: number) => {
        const answer = answerList.map((answer, index) => {
            if (index === item) {
                if (answerList[item] !== 'NO') {
                    return 'NO';
                } else {
                    return 'EMPTY';
                }
            } else {
                return answer;
            }
        });

        setAnswerList(answer);
    };

    useEffect(() => {
        const listPlayer = players.map((player, index) => {
            if (index === turn) {
                return {
                    ...player,
                    answers: answerList,
                    results: [],
                };
            } else {
                return {
                    ...player,
                };
            }
        });
        setPlayers(listPlayer);
        window.localStorage.setItem('players', JSON.stringify(listPlayer));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answerList]);

    return (
        <div className="question-page">
            <div className="question-title">
                <h1>Yes No WTF GAME</h1>
                <p className="lucky">Good luck</p>
            </div>
            <div className="question-page">
                PLAYER: <span style={{ color: 'red' }}>{players[0].name}</span>,{' '}
                <span style={{ color: 'green' }}>{players[1].name}</span>
            </div>
            <h1 style={{ textAlign: 'center' }}>{turn === 0 ? players[0].name : players[1].name}</h1>
            <div className="question-flex">
                {Array.from(Array(round), (x, index) => index + 1).map((question, index) => (
                    <div className="question-item" key={index}>
                        <span>Round {question}:</span>
                        <div className="question">
                            {answerList[index] === 'YES' ? (
                                <button className="btn btn-yes-check" onClick={() => handleChooseYes(index)}>
                                    <CheckOutlined />
                                    <span style={{ marginLeft: '10px' }}> YES</span>
                                </button>
                            ) : (
                                <button className="btn btn-yes" onClick={() => handleChooseYes(index)}>
                                    <CheckOutlined />
                                    <span style={{ marginLeft: '10px' }}> YES</span>
                                </button>
                            )}

                            {answerList[index] === 'NO' ? (
                                <button className="btn btn-no-check" onClick={() => handleChooseNo(index)}>
                                    <CloseOutlined />
                                    <span style={{ marginLeft: '10px' }}> NO</span>
                                </button>
                            ) : (
                                <button className="btn btn-no" onClick={() => handleChooseNo(index)}>
                                    <CloseOutlined />
                                    <span style={{ marginLeft: '10px' }}> NO</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn btn-submit" onClick={submitAnswer}>
                Submit answer
            </button>
        </div>
    );
};

export default QuestionPage;
