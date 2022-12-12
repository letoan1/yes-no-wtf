import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="home-page container">
            <h1 className="text-center">Yes No WTF GAME</h1>
            <p>
                Yes or No is a fun and addicting game, perfect for playing on your own or with friends or family. This
                game contains hundreds of the best hand picked Yes or No questions. Vote which option you prefer and
                view real time statistics on what option was the most popular
            </p>
            <Link to="/add-page">
                <button className="btn btn-start">Start Game</button>
            </Link>
        </div>
    );
};

export default HomePage;
