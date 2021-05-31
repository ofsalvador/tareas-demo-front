import React from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Alert from '@material-ui/lab/Alert';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: 20
  },
  error: {
    color: "red",
    fontSize: "20px"
  }
});

function TareasTable({tareas, handleDelete, showEditTareaModal}) {

  const classes = useStyles();

  if(tareas.length == 0) {
    return <Alert severity="info" className={"mb-4"}>No existen tareas.</Alert>
  }
  
  return (<>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Identificador</StyledTableCell>
            <StyledTableCell>Descripción</StyledTableCell>
            <StyledTableCell align="right">Creado</StyledTableCell>
            <StyledTableCell align="right">Vigente</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tareas.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.descripcion}</StyledTableCell>
              <StyledTableCell align="right">{new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit"
                }).format(row.fecgaCreacion)
              }</StyledTableCell>
              <StyledTableCell align="right">{row.vigente?"Si":"No"}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={()=>showEditTareaModal(row)}><EditIcon fontSize="small" color="primary"/></IconButton>
                <IconButton onClick={()=>handleDelete(row.id)}><DeleteIcon fontSize="small" color="error" /></IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>);

};

const mapStateToProps = (state) => ({ tareas: state.tareas });

export default connect(mapStateToProps)(TareasTable);