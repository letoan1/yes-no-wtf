import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Players } from '../interface';
import '../sass/pages/_confirm.scss';

interface Props {
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
    round: number;
    setRound: React.Dispatch<React.SetStateAction<number>>;
}

const ConfirmPage: React.FC<Props> = (props) => {
    const { players, setPlayers, round, setRound } = props;
    const [isDisabled, setDisabled] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        const removePlayer = players.filter((player, index) => id !== index);
        setPlayers(removePlayer);
    };

    const handleStart = () => {
        if (+round > 0 && +round < 100) {
            navigate('/question-page');
        }
        setRound(+round);
    };

    useEffect(() => {
        console.log(players);

        if (players.length === 2) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [players.length, players]);

    return (
        <div className="confirm-page container">
            <h1 className="text-center">Yes No WTF GAME</h1>
            <p>
                Yes or No is a fun and addicting game, perfect for playing on your own or with friends or family. This
                game contains hundreds of the best hand picked Yes or No questions. Vote which option you prefer and
                view real time statistics on what option was the most popular
            </p>
            <table id="table-confirm">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {!!players.length &&
                        players.map((player, index) => (
                            <tr key={index}>
                                <td>
                                    <span style={{ marginLeft: '70px' }}> {index + 1} </span>
                                    <span style={{ marginLeft: '50px' }} onClick={() => handleDelete(index)}>
                                        <DeleteOutlined />
                                    </span>
                                </td>
                                <td>{player.name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {players.length < 2 && (
                <Link to="/create-page">
                    <button className=" btn-add-more">Add More Player</button>
                </Link>
            )}

            <div className="round">
                <h5>Total round</h5>
                <input
                    type="number"
                    className="input-round"
                    value={round}
                    onChange={(e) => setRound(+e.target.value)}
                />

                <button className="btn-obtain" onClick={handleStart} disabled={isDisabled}>
                    Start
                </button>
            </div>
        </div>
    );
};

export default ConfirmPage;
