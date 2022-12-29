import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import UserService from '../../../pages/api/user.service';
import Accordian from '../accordian/Accordian';

const Quiz = props => {
    const router = useRouter();
    const { quizData, title, detail, teacher } = props;
    const accItems = [];
    const [currentQuiz, setCurrentQuiz] = useState(null)
    const [answersList,setAnswersList] = useState([]);
    const handleChange = (ques, quiz, answer) => {
        const queData = {
            question: ques,
            answer: answer
        }
        setCurrentQuiz(quiz)
        let tempAnslist = answersList;
        tempAnslist.push(queData)
        setAnswersList(tempAnslist)
        //submit single quiz answer


        // if (answersList.length > 0 ) {
        //     const index = answersList.findIndex(answer => answer.id === ques);
        //     if (index > -1) {
        //         let newAnswersList = [...answersList];
        //         newAnswersList[index].values = [selectedOption];
        //         setAnswersList(newAnswersList);
        //     }
        // }
        // else {
        //     setAnswersList([...answersList, answer]);
        // }
    }

    if(quizData.length > 0) {
        quizData.map((item, idx) => {
            accItems.push({
                id: idx+1,
                name: item.questions,
                content: () => (
                    <div>
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`option${item.id}`}
                            value={item.ans1}
                            onChange={() => handleChange(item.id, item.quiz, item.ans1)} />
                        <label className="form-check-label" >
                            {item.ans1}
                        </label>
                        </div>
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`option${item.id}`}
                            value={item.ans2}
                            onChange={() => handleChange(item.id, item.quiz, item.ans2)} />
                        <label className="form-check-label" >
                            {item.ans2}
                        </label>
                        </div>
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`option${item.id}`}
                            value={item.ans3}
                            onChange={() => handleChange(item.id, item.quiz, item.ans3)} />
                        <label className="form-check-label" >
                            {item.ans3}
                        </label>
                        </div>
                        <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name={`option${item.id}`}
                            value={item.ans4}
                            onChange={() => handleChange(item.id, item.quiz, item.ans4)} />
                        <label className="form-check-label" >
                            {item.ans4}
                        </label>
                        </div>
                    </div>
                )
            })
        });
    }
    function submitQuiz() {
        const ansData = {
            teacher: +teacher,
            quiz: currentQuiz,
            answer: answersList
        }
UserService.submitQuiz(ansData).then(res => {
    if(res && res.status === 200){

        router.push("/student-my-quiz")
    }
});
}
    return (
        <div className="container">
            <div className="row ">
                <div className="col-lg-2">
                    <div className="icon">
                    <img src="/assets/images/courses/quiz.jpg" alt="Card image cap" className="avatar-img rounded"/>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h2>{title}</h2>
                    <p>{detail}</p>
                </div>
                <div className='col-md-4'>
                    {/* <button type='button' className='btn btn-info'>Start Quiz</button> */}
                </div>
            </div>
            <div className="row ">
                <div className="col-lg-10 ">
                    {accItems.length === 0 && <label className="col-form-label form-label"> Looks like this quiz is empty</label>}
                    {accItems.length > 0 && <Accordian data={accItems} /> }
                </div>
            </div>
            <Button onClick={() => submitQuiz()}> Submit Quiz</Button>
            {/* <Link href="/student-my-quiz">
            <a rel="noopener noreferrer"  className="theme-btn mt-4" >End Quiz <i className="fas fa-arrow-right"></i></a>
            </Link> */}
        </div>
    )
}

export default Quiz;