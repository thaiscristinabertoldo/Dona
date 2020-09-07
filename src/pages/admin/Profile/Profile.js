import React, { memo, useMemo, useCallback } from 'react'

import { useAsync } from 'react-async'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Box, Paper, Typography, Grid, Button, Container, makeStyles, Icon, CircularProgress } from '@material-ui/core'

import * as usersApi from 'api/users'
import { useAuth } from 'providers/auth'
import { useSnackbar } from 'utils'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  [theme.breakpoints.down('xs')]: {
    img: { width: '100%', height: 'auto' },
  },
  [theme.breakpoints.up('sm')]: {
    img: { width: '200px', height: '200px' },
  },
}))

const Profile = memo(() => {
  const classes = useStyles()

  const { userAuthenticated } = useAuth()

  const { createSnackbar } = useSnackbar()

  const validationSchema = useMemo(() => {
    return Yup.object({
      nome: Yup.string().required('Informe o nome'),
      email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
      telefone: Yup.string().required('Informe o celular'),
    })
  }, [])

  const { data: user, isLoading } = useAsync(usersApi.findUserById, {
    id: userAuthenticated.id,
  })

  const initialValues = useMemo(() => {
    if (user) {
      return {
        ...user,
        senha: '',
      }
    }
  }, [user])

  const onSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      usersApi
        .updateUser({
          id: userAuthenticated.id,
          user: {
            nome: values.nome,
            email: values.email,
            telefone: values.telefone,
            uf: values.uf,
            profissao: values.profissao,
            senha: values.senha !== '' ? values.senha : user.senha,
          },
        })
        .then(() => {
          createSnackbar({
            message: 'Perfil atualizado com sucesso!',
            theme: 'success',
          })
          resetForm(values)
        })
        .catch((e) => {
          createSnackbar({
            message: e.response && e.response.data ? e.response.data.message : e,
            theme: 'error',
          })
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
    [createSnackbar, userAuthenticated.id, user.senha]
  )
  return (
    <Container>
      <Box my={2}>
        <Paper>
          {isLoading && <CircularProgress />}

          {!isLoading && user && (
            <Box display="flex" flexDirection="column" width={1} p={2}>
              <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur={false}
              >
                {({ values, setFieldValue }) => (
                  <Form noValidate>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography>Meu perfil</Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          {values.file && (
                            <Box>
                              <img alt="" src={values.file} className={classes.img} />
                            </Box>
                          )}
                          <Box p={2}>
                            <input
                              accept="image/*"
                              className={classes.input}
                              id="icon-button-file"
                              type="file"
                              name="file"
                              onChange={(e) => {
                                var file = e.target.files[0]
                                var reader = new FileReader()
                                reader.onload = function (item) {
                                  setFieldValue('file', item.target.result)
                                }
                                reader.readAsDataURL(file)
                              }}
                            />
                            <label htmlFor="icon-button-file">
                              <Button
                                color="primary"
                                aria-label="upload picture"
                                variant="contained"
                                className={classes.button}
                                endIcon={<Icon>photo_camera</Icon>}
                                component="span"
                              >
                                Adicionar imagem
                              </Button>
                            </label>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Field component={TextField} name="nome" label="Nome" variant="outlined" fullWidth required />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          name="email"
                          label="E-mail"
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          name="telefone"
                          label="Celular"
                          variant="outlined"
                          fullWidth
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field component={TextField} name="uf" label="Estado" variant="outlined" fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                        <Field component={TextField} name="profissao" label="Profissão" variant="outlined" fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={TextField}
                          type="password"
                          name="senha"
                          label="Senha"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                          <Button type="submit" variant="outlined" color="primary">
                            Salvar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
})

export default Profile
