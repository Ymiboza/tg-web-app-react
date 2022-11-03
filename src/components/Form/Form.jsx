import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../../hooks/useTelegram'
import './Form.css'

const Form = () => {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const { tg } = useTelegram()

    const oneSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', oneSendData)
        return () => {
            tg.offEvent('mainButtonClicked', oneSendData)
        }
    }, [oneSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    }, [])

    useEffect(() => {
        if (!street || !country) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className='form'>
            <h3 className='form-title'>Enter your details</h3>
            <input className='input' type="text" placeholder='Country' value={country} onChange={onChangeCountry} />
            <input className='input' type="text" placeholder='Street' value={street} onChange={onChangeStreet} />
            <select name="" id="" className='select' value={subject} onChange={onChangeSubject}>
                <option value="physical" className='select-option'>Physical</option>
                <option value="legal" className='select-option'>Legal</option>
            </select>
        </div>
    )
}

export default Form