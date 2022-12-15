import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    name: string;
    totalScore: number;
    correctPercent: string;
}

interface Props {
    playerResult: any;
    setPlayerResult: React.Dispatch<any>;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Summary',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        width: '10%',
    },
    {
        title: 'Correct percent',
        dataIndex: 'correctPercent',
        sorter: (a, b) => +a.correctPercent.slice(0, -1) - +b.correctPercent.slice(0, -1),
        width: '20%',
    },
    {
        title: 'Total score',
        dataIndex: 'totalScore',
        sorter: (a, b) => a.totalScore - b.totalScore,
        width: '20%',
    },
];

const ResultTable: React.FC<Props> = (props) => {
    const { playerResult, setPlayerResult } = props;
    const round = JSON.parse(`${window.localStorage.getItem('round')}`) ?? 0;

    const data = playerResult.map((player: any) => {
        return {
            ...player,
            name: player.name,
            totalScore: player.score,
            correctPercent: ((+player.score * 100) / round).toFixed(2) + '%',
        };
    });

    useEffect(() => {
        setPlayerResult(
            data.map((player: any) => {
                return {
                    ...player,
                    name: player.name,
                    totalScore: player.score,
                    correctPercent: ((+player.score * 100) / round).toFixed(2) + '%',
                };
            }),
        );
        window.localStorage.setItem('players', JSON.stringify(playerResult));
    }, [data, playerResult, round, setPlayerResult]);

    return (
        <div>
            <Table
                style={{ marginLeft: '45%' }}
                columns={columns}
                dataSource={data.map((player: any, index: number) => {
                    return {
                        key: index,
                        ...player,
                    };
                })}
                pagination={false}
            ></Table>
        </div>
    );
};

export default ResultTable;
