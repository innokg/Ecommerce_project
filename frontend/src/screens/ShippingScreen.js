import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({}) {
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e)=> {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }




  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Доставка</h1>
        <form onSubmit={submitHandler}>
            

            <Form.Group controlId='address'>
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                required 
                type='text' 
                placeholder='Введите свой адрес' 
                value={address ? address : ''}
                onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>


            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>Город</Form.Label>
                <Form.Control
                required 
                type='text' 
                placeholder='Введите свой город' 
                value={city ? city : ''}
                onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>


            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Почтовый индекс</Form.Label>
                <Form.Control
                required 
                type='text' 
                placeholder='Введите свой почтовый индекс' 
                value={postalCode ? postalCode : ''}
                onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>


            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Страна</Form.Label>
                <Form.Control
                required 
                type='text' 
                placeholder='Введите свою страну' 
                value={country ? country: ''}
                onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Продолжить
            </Button>

        </form>
    </FormContainer>
  )
}

export default ShippingScreen