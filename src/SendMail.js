import React from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { closeSendMessage } from "./features/mailSlice";
import  { useDispatch } from "react-redux"
import { db, addDoc, collection } from "./firebase";
import firebase from 'firebase/compat/app';



function SendMail() {
  const {register, handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch();

  const onSubmit=async (formData)=>{
      console.log(formData);
      await addDoc(collection(db, "emails"), {
                  to: formData.to,
                  subject: formData.subject,
                  message: formData.message,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
      dispatch(closeSendMessage());
  };
    

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New message</h3>
        <CloseIcon 
          className="sendMail__close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
               <input name='to'      {...register('to', {required:true})} type="email" placeholder="To" /> 
                        {errors.to && <p className="sendMail__error">This field is required !</p>}
               <input name='subject' {...register('subject', {required:true})} type="text" placeholder="Subject"  />
                        {errors.subject && <p className="sendMail__error">The Subject is required !</p>}
               <input name='message' {...register('message', {required:true})} type="text" placeholder="Message..." className="sendMail__message"  /> 
                        {errors.message && <p className="sendMail__error">The Message is required !</p>}
               <div className="sendMail__options">
                   <Button
                        className="sendMail__send"
                        variant="container" color="primary"
                        type="submit"
                   >Send</Button>
               </div>
           </form>
    </div>
  );
}

export default SendMail;
