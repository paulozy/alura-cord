import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import appThemes from '../config.json';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNjEwNywiZXhwIjoxOTU4ODgyMTA3fQ.xV0Pzb4pn1PJ4tntMP2zPBenqSvqHGCmRzPpmffyPio'
const SUPABASE_URL = 'https://tqvtumnqdwzwrshcmime.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const Chat = () => {
       
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])


    useEffect(() => {
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => setMessageList(data))
    }, [])

    const handleNewMessase = newMessage => {
 
        if(!newMessage) {
            return
        }

        const message = {
            // id: messageList.length + 1,
            from: 'paulozy',
            messageText: newMessage, 
        }

        supabaseClient
            .from('messages')
            .insert([ message ])
            .then(({ data }) => {
                setMessageList([
                    data[0],
                    ...messageList
                ])
            })

        
        setMessage('')
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://images6.fanpop.com/image/photos/40700000/one-piece-one-piece-40710900-2549-1500.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appThemes.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messages={messageList}/>
                    

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'middle',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if(e.key === "Enter") {
                                    e.preventDefault()
                                    handleNewMessase(message)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appThemes.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appThemes.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            value={message}
                            label="Enviar"
                            variant='secondary'
                            colorVariant='light'
                            size="xl"
                            onClick={() => {
                                handleNewMessase(message)
                            }}    
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}


const Header = () => {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='secondary'
                    colorVariant='dark'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

const MessageList = ({ messages }) => {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appThemes.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflowX: 'hidden'
            }}
        >


            {messages.map(({ from, messageText }, index) => {
                return (
                    <Text
                key={index}
                tag="li"
                styleSheet={{
                    borderRadius: '5px',
                    padding: '6px',
                    marginBottom: '12px',
                    hover: {
                        backgroundColor: appThemes.theme.colors.neutrals[700],
                    }
                }}
            >
                <Box
                    styleSheet={{
                        marginBottom: '8px',
                    }}
                >
                    <Image
                        styleSheet={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '8px',
                        }}
                        src={`https://github.com/${from}.png`}
                    />
                    <Text tag="strong">
                        {from}
                    </Text>
                    <Text
                        styleSheet={{
                            fontSize: '10px',
                            marginLeft: '8px',
                            color: appThemes.theme.colors.neutrals[300],
                        }}
                        tag="span"
                    >
                        {(new Date().toLocaleDateString())}
                    </Text>
                </Box>
                {messageText}
            </Text>
                )
            })}

            
        </Box>
    )
}

export default Chat 