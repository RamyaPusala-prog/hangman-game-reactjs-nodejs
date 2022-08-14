import React, { useEffect, useState } from "react";
import { Strings } from '../constants/Constants';
import { WrongCount, Button } from '../components';
const { REACT_APP_API_ENDPOINT } = process.env;

function Hangman() {

    const [wronglyGuessed, setwronglyGuessed] = useState(0);
    const [guessedWord, setguessedWord] = useState(new Set());
    const [finalAns, setfinalAns] = useState('');
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    //getting data from api
    const getData = (url, method) => {
        return fetch(REACT_APP_API_ENDPOINT + url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
    }

    //handling response from api
    const handleRes = () => {
        getData(Strings.GET_STRING_URL, Strings.METHOD).then((data) => {
            if (data && data.code == 200) {
                setfinalAns(data.data);
            } else {
                //backend response error
                setfinalAns('')
            }
        })
            .catch((error) => { console.error('Error:', error) });
    }

    //saving data to variables
    const handleGuess = (value) => {
        let letter = value;
        forceUpdate();
        setguessedWord(guessedWord.add(letter))
        setwronglyGuessed(wronglyGuessed + (finalAns.includes(letter) ? 0 : 1));
    }

    //handle reset
    const resetButton = () => {
        setwronglyGuessed(0);
        setguessedWord(new Set());
        setfinalAns('');
        handleRes();
    };

    //re arranging data and displaying
    const guessingWord = () => {
        return finalAns.split("").map((item) => (guessedWord.has(item) ? item : "_"));
    }

    const isWinner = guessingWord().join("") === finalAns ? "YOU WON" : wronglyGuessed >= Strings.MAX_WRONG_ATTEMPTS ? "YOU LOST" : null;

    useEffect(() => {
        handleRes();
    }, [setfinalAns]);

    return (
        <div className="main">
            <WrongCount WrongLetterCount={wronglyGuessed} />
            <p className="text-typing buttons">
                {!isWinner && finalAns ? guessingWord() : finalAns}
            </p>
            {!isWinner ?
                <>
                    {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
                        <Button letter={letter} handleGuess={handleGuess.bind(this)} handleReset={resetButton.bind(this)} disabled={guessedWord.has(letter)} />
                    ))}
                </>
                :
                <>
                    <h6>{isWinner}</h6>
                    <Button letter={"reset"} handleGuess={resetButton.bind(this)} />
                </>
            }
        </div >
    )
}

export default Hangman;