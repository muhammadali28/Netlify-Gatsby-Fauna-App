import * as React from "react"
import { Formik } from 'formik';

export default function Home() {
  return <div>

    <h1>Enter Title</h1>
    <Formik
       initialValues={{ title: '' }}
       validate={values => {
         const errors = {};
         if (!values.title) {
           errors.title = 'Required';
         } 
       }}
       onSubmit={(values, { setSubmitting }) => {
         console.log(values);

         fetch(`/.netlify/functions/add_msg`, {
          method: 'post',
          body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => {
        console.log(data);
        });
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="text"
             name="title"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.title && touched.title && errors.title}

           <button type="submit" disabled={isSubmitting}>
             Add Title
           </button>
         </form>
       )}
     </Formik>
</div>;
}
