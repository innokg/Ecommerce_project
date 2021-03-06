import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()


    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))

    }

  return (
    <FormContainer>
        <h1>Залогиниться</h1>
        {error && <Message variant='danger'>{error}</Message>}
        { loading && <Loader />}
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
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
                type='password' 
                placeholder='Введите свой пароль' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

        <Button type='submit' variant='primary'>
            Войти
        </Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Новый пользователь? <Link 
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                Зарегистрироваться</Link>
            </Col>

        </Row>

    </FormContainer>
  )
}

export default LoginScreen