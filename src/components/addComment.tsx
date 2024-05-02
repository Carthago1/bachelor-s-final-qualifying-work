import React, { useState } from 'react';
import { Input, Button } from 'antd';

export default function AddComment() {
    const [input, setInput] = useState('');
    const [buttonsVisibility, setButtonsVisibility] = useState(false);
    
    return (
        <>
            <Input.TextArea 
                placeholder='Введите комментарий'
                autoSize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onClick={() => setButtonsVisibility(true)}
            >
            </Input.TextArea>
            {buttonsVisibility &&
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 20}}>
                    <Button type='default' onClick={() => {
                        setButtonsVisibility(false);
                        setInput('');
                    }}>
                        Отмена
                    </Button>
                    <Button type='primary'>Оставить комментарий</Button>
                </div>
            }
        </>
    )
}
