import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appThemes from '../config.json'

const Title = ({ children, tag }) => {
    const Tag = tag || 'h1'

    return (
        <>
            <Tag>{children}</Tag>

            <style jsx>{`
            ${Tag} {
                    color: ${appThemes.theme.colors.neutrals['100']}
                    font-size: 24px;
                    font-weight: 600;
                }`
            }
            </style>
        </>
    )
}

export default function home() {
  {/* const username = 'paulozy'; */}
  const [username, setUsername] = useState('paulozy')

  const route = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appThemes.theme.colors.neutrals[300],
          backgroundImage: "url(https://images6.fanpop.com/image/photos/40700000/one-piece-one-piece-40710900-2549-1500.jpg)",
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Formulário */}
          <Box
            onSubmit={(e) => {
              e.preventDefault()
              
              route.push('/chat')

            }}
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Bem vindo a tripulação</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appThemes.theme.colors.neutrals[300] }}>
              {appThemes.name}
            </Text>

            <TextField
              value={username}
              onChange={(event) => {
                const usernameValue = event.target.value

                setUsername(usernameValue)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appThemes.theme.colors.neutrals[200],
                  mainColor: appThemes.theme.colors.neutrals[900],
                  mainColorHighlight: appThemes.theme.colors.primary[500],
                  backgroundColor: appThemes.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appThemes.theme.colors.neutrals["000"],
                mainColor: appThemes.theme.colors.primary[500],
                mainColorLight: appThemes.theme.colors.primary[400],
                mainColorStrong: appThemes.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appThemes.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appThemes.theme.colors.primary[800],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appThemes.theme.colors.neutrals[200],
                backgroundColor: appThemes.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}