import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile




    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo,  user, success])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage('Пароли не совпадают!')
        }else{
            dispatch(updateUserProfile({
                'id':user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }


    }

  return (
    <Row>
        <Col md={3}>
            <h2>Страница пользователя</h2>

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
                type='password' 
                placeholder='подтвердите свой пароль' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            Обновить
            </Button>


        </Form>


        </Col>

        <Col md={9}>
            <h2>Мой заказ</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen