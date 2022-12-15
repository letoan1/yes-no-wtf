export interface Players {
    id: number;
    name: string;
    createdAt: string;
    answers: string[];
    results: string[];
    score?: number;
    correctPercent?: number;
}
