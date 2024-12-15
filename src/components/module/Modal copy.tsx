// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { TextField } from "@mui/material";

// type FormInputs = {
//   firstName: string;
// };

// const Test = () => {
//   return <input />;
// };

// function App() {
//   const { control, handleSubmit } = useForm<FormInputs>();
//   const onSubmit = (data: FormInputs) => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="firstName"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} />}
//       />

//       <input type="submit" />
//     </form>
//   );
// }
