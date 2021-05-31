import { render, screen } from '@testing-library/react';
import NuevaTareaModal from './components/nuevaTareaModal';

describe('Titulo del modal según el tipo', () => {
  it('Modal Nueva Tarea', () => {

    const handleNuevaTareaModalProps = {
      open: true,
      handleClose: ()=>{},
      handleSubmit: ()=>{},
      handleEditSubmit: ()=>{},
      showNuevaTareaModal: ()=>{},
      submitError: false,
      tareaSelected: null
    };
    
    const { getByText } = render(<NuevaTareaModal {...handleNuevaTareaModalProps}/>);
    expect( getByText('Nueva Tarea')).toBeInTheDocument();
    
  });

  it('Modal Editar Tarea', () => {

    const handleNuevaTareaModalProps = {
      open: true,
      handleClose: ()=>{},
      handleSubmit: ()=>{},
      handleEditSubmit: ()=>{},
      showNuevaTareaModal: ()=>{},
      submitError: false,
      tareaSelected: {id: "sadsa", descripcion: "fdsfds"}
    };
    
    const { getByText } = render(<NuevaTareaModal {...handleNuevaTareaModalProps}/>);
    expect( getByText('Editar Tarea')).toBeInTheDocument();
    
  });

});
