import "./index.css";
import useEntityUsers from "../../hooks/Entities/useEntityUsers";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import UserEntityForm from "../../components/entities/form";
import useDeleteEntityUser from "../../hooks/Entities/useDeleteEntityUser";
import { Alert } from "react-bootstrap";

export default function Entities() {
  const { users, loading, error }: any = useEntityUsers();
  const { deleteUser,message }: any = useDeleteEntityUser();

    const handleClick = (event:any, usernameType: string, username: string) => 
    {
        event.preventDefault()
        deleteUser(usernameType, username)
    }    
    ;

  return (
    <div className="m-3">

      <h1>
        Registro de usuarios de la entidad
      </h1>

      <UserEntityForm/>

      {loading && <h1>Cargando...</h1>}
      {error && <Alert variant={'danger'}>
          Error al cargar los usuarios de la entidad
        </Alert>
      }
    <Table responsive variant="dark">
      <thead>
        <tr>
        <th>Usuario</th>
        <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
          {users?.map((entity: any) => (
          <tr key={entity.username}>
          <td>{entity.username}</td>
          <td>
          <Button variant="danger" href=""><i className="fa-solid fa-trash-can" onClick={(event)=>handleClick(event,entity?.usernameType, entity?.username)}></i></Button>{' '}
          </td>
        </tr>
        ))}
      </tbody>
    </Table>
    {message && <Alert variant={'success'} className="mt-3">
          {message}
        </Alert>
      }
    </div>
     
  );
}