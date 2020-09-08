import React, { memo, useMemo, useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Button, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core'

import * as usersApi from 'api/users'

import { HeaderAuth } from 'components/HeaderAuth'

import { useSnackbar } from 'utils'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  divCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: '4px',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    },
  },
  cardContainer: {
    padding: theme.spacing(0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const CreateAccount = memo(() => {
  const { createSnackbar } = useSnackbar()

  const classes = useStyles()
  const history = useHistory()

  const handleSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      usersApi
        .createUser({
          nome: values.nome,
          email: values.email,
          senha: values.senha,
          telefone: values.celular,
          uf: values.uf,
          profissao: values.profissao,
        })
        .then(() => {
          createSnackbar({
            message: 'Usuária cadastrado com sucesso!',
            theme: 'success',
          })
          resetForm({ values })
          history.push('/auth/login')
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
    [createSnackbar, history]
  )

  const validationSchema = useMemo(() => {
    return Yup.object({
      nome: Yup.string().required('Informe o nome'),
      email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
      celular: Yup.string().required('Informe o celular'),
      profissao: Yup.string().required('Informe a profissão'),
      senha: Yup.string().required('Informe a senha'),
    })
  }, [])

  const initialValues = useMemo(() => {
    return {
      nome: '',
      email: '',
      celular: '',
      senha: '',
      uf: '',
      profissao: '',
    }
  }, [])

  return (
    <div className={classes.divCard}>
      <HeaderAuth title="Criar cadastro" />

      <CardContent className={classes.cardContainer}>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          {({ isSubmitting, isValid }) => (
            <Form noValidate className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    name="nome"
                    fullWidth
                    label="Nome"
                    required
                    component={TextField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    name="email"
                    fullWidth
                    label="E-mail"
                    required
                    component={TextField}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    name="celular"
                    fullWidth
                    label="Celular"
                    required
                    component={TextField}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    component={TextField}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field variant="outlined" margin="normal" name="uf" fullWidth label="Estado" component={TextField} />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="profissao"
                    label="Profissão"
                    component={TextField}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  className={classes.submit}
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting || !isValid}
                >
                  Cadastrar
                </Button>
              </Grid>
              {isSubmitting && (
                <Grid item>
                  <CircularProgress size="2rem" />
                </Grid>
              )}
            </Form>
          )}
        </Formik>

        <Grid container spacing={2}>
          <Grid item xs>
            <Button color="primary" size="small" onClick={() => history.push('/auth/login')}>
              voltar
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  )
})

export default CreateAccount
