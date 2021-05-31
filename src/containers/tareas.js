import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Del, Get, Post, Put } from '../api'
import TareasTable from '../components/tareasTable';
import { Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Add, Refresh } from '@material-ui/icons';
import NuevaTareaModal from '../components/nuevaTareaModal';

function TareasContainer({tareas}) {
  const [openNuevaTareaModal, setOpenNuevaTareaModal] = useState(false);
  const [tareaSelected, setTareaSelected] = useState(null);
  const [submitError, setSubmitError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
    
  const handleCloseNuevaTareaModal = () => {
    setSubmitError(false);
    setOpenNuevaTareaModal(false);
  };

  const showNuevaTareaModal = (tarea) => {
    setTareaSelected(tarea);
    setOpenNuevaTareaModal(true);
  };

  const handleNuevaTarea = async(tarea) => {
    setLoading(true);
    try {
      setSubmitError(false);
      const data = await Post("/api/tarea", tarea);
      dispatch({ type: 'add', payload: data });
      handleCloseNuevaTareaModal();
    }
    catch(err) {
      setSubmitError(true);
      console.error("ERROR", err);
      throw err;
    }
    finally {
      setLoading(false);
    }
  };

  const handleEditarTarea = async(tarea) => {
    setLoading(true);
    try {
      setSubmitError(false);
      const data = await Put(`/api/tarea/${tarea.id}`, tarea);
      dispatch({ type: 'update', payload: data });
      handleCloseNuevaTareaModal();
    }
    catch(err) {
      setSubmitError(true);
      console.error("ERROR", err);
      throw err;
    }
    finally {
      setLoading(false);
    }
  };

  const handleEliminarTarea = async(id) => {
    setLoading(true);
    try {
      setDeleteError(false);
      await Del(`/api/tarea/${id}`);
      dispatch({ type: 'delete', payload: id });
      alert("Tarea eliminada correctamente.");
    }
    catch(err) {
      setDeleteError(true);
      console.error("ERROR", err);
    }
    finally {
      setLoading(false);
    }
  };

  const loadTareas = async() => {
    setLoading(true);
    setLoadingError(false);
    setDeleteError(false);
    try {
      const data = await Get("/api/tarea");
      dispatch({ type: 'load', payload: data });
    }
    catch(err) {
      setLoadingError(true);
      console.error("ERROR", err);
    }
    finally {
      setLoading(false);
    }
    
  };
    
  useEffect(() => loadTareas());

  const handleNuevaTareaModalProps = {
    open: openNuevaTareaModal,
    handleClose: handleCloseNuevaTareaModal,
    handleSubmit: handleNuevaTarea,
    handleEditSubmit: handleEditarTarea,
    showNuevaTareaModal,
    submitError,
    tareaSelected
  };

  const handleTareaTableProps = {
    handleDelete: handleEliminarTarea,
    showEditTareaModal: showNuevaTareaModal
  };

  return <>
    <h4>Lista de Tareas</h4>
    <Button 
      variant="contained" 
      color="primary" 
      startIcon={<Refresh/>} 
      onClick={loadTareas}
      >
        Refrescar
    </Button>
    <Button 
      className={"ms-3"}
      variant="contained" 
      color="primary" 
      startIcon={<Add/>} 
      onClick={()=>showNuevaTareaModal(null)}
      >
        Nueva Tarea
    </Button>
    <hr/>
    {!loading && deleteError && <Alert severity="error" className={"mb-4"}>Error eliminando la tarea.</Alert>}
    {!loading && !loadingError && <TareasTable {...handleTareaTableProps}/> }
    {loading && <div className={"text-center"}><CircularProgress className={"col-12 my-4 text-center"}/></div>}
    {!loading && loadingError && <Alert severity="error" className={"mb-4"}>Error cargando las tarea.</Alert>}
    <NuevaTareaModal {...handleNuevaTareaModalProps}/>
  </>

};

const mapStateToProps = (state) => {
  return { tareas: state.tareas };
}

export default connect(mapStateToProps)(TareasContainer);