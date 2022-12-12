import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Players } from '../interface';
import '../sass/pages/_create.scss';

interface Props {
    players: Players[];
    setPlayers: React.Dispatch<React.SetStateAction<Players[]>>;
}

const CreatePage: React.FC<Props> = (props) => {
    const { players, setPlayers } = props;
    const [name, setName] = useState<string>('');
    const inputRef = useRef<any>(null);
    const navigate = useNavigate();

    const handleCreate = () => {
        if (name && name.trim()) {
            setPlayers((prev) => [
                ...prev,
                {
                    id: players.length,
                    name,
                    createdAt: format(new Date(), 'dd/MM/yyyy p'),
                    answers: [],
                    results: [],
                },
            ]);
            navigate('/confirm-page');
        }
        setName('');
        inputRef.current.focus();
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="create-page container">
            <h1 className="text-center">Yes No WTF GAME</h1>
            <p className="text-create">
                Yes or No is a fun and addicting game, perfect for playing on your own or with friends or family. This
                game contains hundreds of the best hand picked Yes or No questions. Vote which option you prefer and
                view real time statistics on what option was the most popular
            </p>

            <div className="create-player">
                <div className="create-player__title">
                    <h4>Please enter a new name</h4>
                </div>
                <div className="create-player__form">
                    <label htmlFor="name">New name: </label> <br />
                    <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="input-name"
                    />
                    <div className="create-player__button">
                        <button className="btn-create" onClick={handleCreate}>
                            OK
                        </button>
                        <button className="btn-create" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
