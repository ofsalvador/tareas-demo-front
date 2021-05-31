import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { TextField, Button, FormControlLabel, Checkbox, Divider, Typography } from "@material-ui/core";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: '70%',
    backgroundColor: theme.palette.background.paper,
    padding: 20
  },

  contentModal: {
    padding: 40    
  },

  footerModal: {
    borderTop: "1px solid #CCCCCC",
    padding: "20px 20px 0px 20px",
    textAlign: "right"
  }
}));

const TareaSchema = Yup.object().shape({
  descripcion: Yup.string().required('Required'),
  vigente: Yup.boolean().oneOf([true, false], "Invalid value")
});

export default ({open, handleClose, handleSubmit, handleEditSubmit, submitError, tareaSelected}) => {
  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  let initialValues = { descripcion: '', vigente: true };
  if(tareaSelected) {
    initialValues = {...tareaSelected};
  }
  
  return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div style={modalStyle} className={classes.paper}>
      <h4>{tareaSelected?"Editar Tarea":"Nueva Tarea"}</h4>
      <hr/>
      <Formik
       initialValues = {initialValues}
       validationSchema={TareaSchema}
       onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const submit = tareaSelected?handleEditSubmit:handleSubmit;
          submit(values).then(resp=>{
            handleClose();
          }).catch(err=> {
            console.error(err);
          }).finally(()=>setSubmitting(false));
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
         <Form>
          <div className={classes.contentModal}>
            {submitError && <Alert severity="error" className={"mb-4"}>Error enviando la tarea.</Alert>}
            {tareaSelected && 
            (<div className={"mb-3"}>
            <Typography component="small">
              <strong>Identificador:</strong> {tareaSelected.id}
            </Typography>
            <br></br>
            <Typography component="small">
              <strong>Fecha de Creación:</strong> {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                }).format(tareaSelected.fecgaCreacion)
              }
            </Typography>
            </div>)}
            <TextField
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              className={"col-12"}
              label="Descripción"
              name="descripcion"
              multiline
              rows={4}
              style={{width: "70%"}}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.descripcion}
              variant="outlined"
            />
            <FormControlLabel
              className={"col-12"}
              control={
                <Checkbox
                  checked={values.vigente}
                  onChange={handleChange}
                  name="vigente"
                  color="primary"
                />
              }
              label="Vigente"
            />
            {errors.vigente && <div style={{color:"red"}}>{errors.vigente}</div>}
           </div>
           <div className={classes.footerModal}>
           
              <Button 
                  variant="contained" 
                  color="primary" 
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  >
                    Aceptar
              </Button>
              
              <Button 
                  className={"ms-2"}
                  variant="contained" 
                  disabled={isSubmitting}
                  onClick={handleClose}
                  >
                    Cerrar
              </Button>

           </div>
         </Form>
       )}
     </Formik>
    </div>
  </Modal>
};

