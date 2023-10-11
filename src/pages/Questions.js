// import React, { useEffect, useState } from 'react'
// import useAxios from '../hooks/useAxios';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { Box, Button, CircularProgress, Typography } from '@mui/material';
// import { handleScoreChange } from '../redux/action';
// // import {decode} from 'html-entities';

// const Questions = () => {

// const getRandomInt=(max)=>{
//    return Math.floor(Math.random() * Math.floor(max));
// }
                                                                    
//   const{
//     question_category,
//     question_difficulty,
//     question_type,
//     amount_of_question,
//     score
//   } = useSelector((state) => state);

//   const history = useHistory();
//   const dispatch = useDispatch();

// //  console.log(question_category,question_difficulty,question_type,amount_of_question);

//   let apiUrl = `/api.php?amount=${amount_of_question}`;
 
//   if (question_category) {
//     apiUrl = apiUrl.concat(`&category=${question_category}`);
//   }
//   if (question_difficulty) {
//     apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
//   }
//   if (question_type) {
//     apiUrl = apiUrl.concat(`&type=${question_type}`);
//   }
   
//   const {response,loading} = useAxios({url: apiUrl});
//   console.log(response);
                                                               
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     if(response?.results.length){
//       const question = response.results[questionIndex];

//       // below logic is done to make rearrange the order of the options when refreshed
//       let answers = [...question.incorrect_answers];
//       answers.splice(
//         getRandomInt(question.incorrect_answers.length),
//         0,
//         question.correct_answer
//       );
//       setOptions(answers);
//     }
//   }, [response, questionIndex]);
  

//   if(loading){
//     return (
//     <Box mt={20}>
//     <CircularProgress/>      
//     </Box>
//     )
//   }

//   const handleClickAnswer=(e)=>{

//     // check whether ans is correct or not 
//     const question = response.results[questionIndex];
//     if(e.target.textContent === question.correct_answer){
//       dispatch(handleScoreChange(score+1));
//     }

//      if(questionIndex + 1 < response.results.length){
//       setQuestionIndex(questionIndex+1);
//      }
//      else{
//           history.push("/score")
//      }
//   };

//   return (
// <>

//   <Typography variant="h4">Question {questionIndex + 1}</Typography>
//   <Typography mt={5}>{response.results[questionIndex].question}</Typography>
//   {options.map((data, id) => (
//         <Box mt={2} key={id}>
//           <Button onClick={handleClickAnswer} variant="contained">
//             {data}
//           </Button>
//         </Box>
//       ))}
//    <Box mt={5}>
//         Score: {score} / {response.results.length};
//       </Box>
// </>


//   )
// }

// export default Questions



import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/action";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if (loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Question: {questionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(response.results[questionIndex].question)}
      </Typography>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <Button onClick={handleClickAnswer} variant="contained">
            {decode(data)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {score} / {response.results.length}
      </Box>
    </Box>
  );
};

export default Questions;