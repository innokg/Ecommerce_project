import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage('Пароли не совпадают!')
        }else{
            dispatch(register(name, email, password))
        }


    }

  return (
  
        <FormContainer>
        <h1>Залогиниться</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        { loading && <Loader />}
        <Form onSubmit={submitHandler}>
            
            <Form.Group controlId='name'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                required 
                type='name' 
                placeholder='Введите свое имя' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>


            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                required  
                type='email' 
                placeholder='Введите свой email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>


            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Пароль: </Form.Label>
                <Form.Control
                required  
                type='password' 
                placeholder='Введите свой пароль' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Подтвердите пароль: </Form.Label>
                <Form.Control
                required  
                type='password' 
                placeholder='подтвердите свой пароль' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            Зарегистрироваться
            </Button>


        </Form>

        <Row className='py-3'>
            <Col>
                Уже зарегистрированы? <Link 
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                >
                Войти</Link>
            </Col>

        </Row>

        </FormContainer>
  )
}

export default RegisterScreen