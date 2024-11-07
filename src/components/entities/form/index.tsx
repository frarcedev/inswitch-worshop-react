import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useCreateUser from '../../../hooks/Entities/usePostEntityUser';
import { Alert } from 'react-bootstrap';

export default function UserEntityForm() {

    const { createUser, loading, error }: any = useCreateUser();

    const handleSubmit = async (event:any) => {
        event.preventDefault()
        let user = event.target[0].value;
        await createUser(user)
      }

  return (
    <div className="m-3">
      
      <Form onSubmit={handleSubmit}>
        <div className="d-flex">
        <Form.Group className="mb-3 col-4" controlId="formBasicEmail" >
        <Form.Label>Nombre del usuario</Form.Label>
        <Form.Control type="text" placeholder="Ingrese el nombre de usuario" name='username' required/>
        </Form.Group>
        </div>
        <div className="d-flex justify-content-center gap-2">
        <Button variant="primary" type="submit">
        Guardar
      </Button>
      <Button variant="secondary" type="reset">
        Cancelar
      </Button>
        </div>

    </Form>
    {loading && <h1>Cargando...</h1>}
      {error && <Alert variant={'danger'} className='my-3'>
          {error?.response?.data?.errorDescription} 
        </Alert>
      }
    </div>
  );
}