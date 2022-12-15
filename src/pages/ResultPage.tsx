import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { Players } from '../interface';
import ResultTable from '../components/ResultTable';
import '../sass/pages/_result.scss';

interface Props {
    players: Players[];
}

interface DataType {
    key: React.Key;
    id: number;
    name: string;
    createdAt: string;
    answers: string;
    results: string;
    score: number;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'No',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
        defaultSortOrder: 'ascend',
        width: '10%',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name.length - b.name.length,
        width: '10%',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        width: '20%',
    },
    {
        title: 'Answers',
        dataIndex: 'answers',
        render: (answers) => <span>{answers.join(', ')} </span>,
        width: '10%',
    },
    {
        title: 'Results',
        dataIndex: 'results',
        render: (results) => <span>{results.join(', ')} </span>,
        width: '20%',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        sorter: (a, b) => a.score - b.score,
        width: '20%',
    },
];

const ResultPage: React.FC<Props> = (props) => {
    const { players } = props;
    const [searchArr, setSearchArr] = React.useState<any>(JSON.parse(`${window.localStorage.getItem('players')}`));

    const [winner, setWinner] = useState<string>('');
    const [playerResult, setPlayerResult] = useState<any>(
        players.map((player) => {
            return {
                ...player,
                results: player.results,
                answers: player.answers,
                score: player.answers.filter((answer, index) => player.answers[index] === player.results[index]).length,
            };
        }),
    );

    useEffect(() => {
        setSearchArr(playerResult);
        if (playerResult[0].score > playerResult[1].score) {
            setWinner(`The winner is: ${playerResult[0].name}`);
        } else if (playerResult[0].score < playerResult[1].score) {
            setWinner(`The winner is: ${playerResult[1].name}`);
        } else {
            setWinner(`This match is drawn!`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (search: string) => {
        const searchResult = playerResult.filter((data: any) => data.name.toLowerCase().includes(search.toLowerCase()));
        setSearchArr(searchResult);
    };

    return (
        <div className="result-page">
            <h1>Yes No WTF GAME</h1>
            <button className="btn btn-result">Final Result</button>

            <div className="feature">
                <input
                    placeholder="Search by player name"
                    className="input-results"
                    onChange={(e) => handleSearch(e.target.value)}
                ></input>
            </div>
            <Table
                columns={columns}
                dataSource={searchArr.map((player: any) => {
                    return {
                        key: player.id,
                        ...player,
                    };
                })}
                pagination={false}
            />
            <ResultTable playerResult={playerResult} setPlayerResult={setPlayerResult} />
            <h1 style={{ textAlign: 'center', margin: '70px	' }}>{winner}</h1>
            <button className="btn btn-end">End Game</button>
        </div>
    );
};

export default ResultPage;
