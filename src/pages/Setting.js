import React from 'react'
import SelectField from '../Components/SelectField'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import TextFieldComp from '../Components/TextFieldComp'
import useAxios from '../hooks/useAxios'
import { useHistory } from "react-router-dom";


const Setting = () => {

  // useHistory used for redirecting the page where it is targeted.
  const history = useHistory();
  const {response, error, loading} = useAxios({url: "/api_category.php" });
  // console.log(response);

  if(loading){
    return (
    <Box mt={20}>
    <CircularProgress/>      
    </Box>
    )
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something Went Wrong!!
      </Typography>
    );
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    history.push("/questions");
  }

  const selectDifficulty = [
    {id:"easy" , name: "Easy"},
    {id:"medium" , name: "Medium"},
    {id:"hard" , name: "Hard"},
  ];

  const selectType=[
    {id:"multiple",name:"MCQ"},
    {id:"boolean",name:"True/False"},
  ];

  return (
    
    <form onSubmit={handleSubmit}>
        <SelectField options={response.trivia_categories} label="Category" />
        <SelectField options={selectDifficulty} label="Difficulty" />
        <SelectField options={selectType} label="Type" />
        <Box mt={3} width="100%">
        <TextFieldComp/>
        <Button style={{marginTop:"26px"}} fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>

  )
}

export default Setting



// import { Button, CircularProgress, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import { useHistory } from "react-router-dom";
// import SelectField from "../Components/SelectField";
// import TextFieldComp from "../Components/TextFieldComp";
// import useAxios from "../hooks/useAxios";
   
// const Setting = () => {
//   const { response, error, loading } = useAxios({ url: "/api_category.php" });
//   const history = useHistory();

//   if (loading) {
//     return (
//       <Box mt={20}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Typography variant="h6" mt={20} color="red">
//         Some Went Wrong!
//       </Typography>
//     );
//   }

//   const difficultyOptions = [
//     { id: "easy", name: "Easy" },
//     { id: "medium", name: "Medium" },
//     { id: "hard", name: "Hard" },
//   ];

//   const typeOptions = [
//     { id: "multiple", name: "MCQ" },
//     { id: "boolean", name: "True/False" },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     history.push("/questions");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <SelectField options={response.trivia_categories} label="Category" />
//       <SelectField options={difficultyOptions} label="Difficulty" />
//       <SelectField options={typeOptions} label="Type" />
//       <TextFieldComp />
//       <Box mt={3} width="100%">
//         <Button fullWidth variant="contained" type="submit">
//           Get Started
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default Setting;