import React, {useEffect, useState} from "react";
import {ResponseCardType} from "../../api/CardsAPI";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useParams} from "react-router-dom";
import {sendUpdatedGradeTC, setCardsTC} from "../../reducers/r10-CardsReducer";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: ResponseCardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const Learn = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {
        cards, maxGrade, sortCards,
        minGrade, page, pageCount, searchCardQuestion
    } = useSelector((state: AppRootStateType) => state.cards)
    const {id} = useParams<{ id: string }>();

    const [card, setCard] = useState<ResponseCardType>({
        answer: 'answer fake',
        question: 'question fake',
        cardsPack_id: '',
        grade: 0,
        rating: 0,
        shots: 0,
        type: '',
        user_id: '',
        created: '',
        updated: '',
        __v: 0,
        _id: 'fake',
        comment: '',
        more_id: ''
    });


    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(setCardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }

    const sendGrade = (grade: number) => {
        dispatch(sendUpdatedGradeTC(grade, card._id, card.cardsPack_id, maxGrade, minGrade,
            page, pageCount, searchCardQuestion, sortCards))
    }

    return (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>
            <div>
                <button onClick={onNext}>next</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => sendGrade(i + 1)}>{g}</button>
                    ))}
                </>
            )}
        </div>
    );
};