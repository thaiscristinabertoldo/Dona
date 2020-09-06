import React, { memo, useMemo, useCallback } from 'react'

import { useHistory } from 'react-router-dom'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Avatar, Button, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core'

import AccountBox from '@material-ui/icons/AccountBox'

import { HeaderAuth } from 'components/HeaderAuth'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
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
  const classes = useStyles()
  const history = useHistory()

  const handleSubmit = useCallback((values, { setSubmitting, resetForm }) => {
    //   loginApi
    //     .recuperarSenha({ email: values.email })
    //     .then(res => {
    //       createSnackbar({
    //         message: 'E-mail enviado com sucesso!',
    //         theme: 'success',
    //         pauseOnHover: true
    //       })
    //       resetForm(values)
    //       history.push('/auth/login')
    //     })
    //     .catch(e => {
    //       createSnackbar({
    //         message: e.response.data ? e.response.data.message : e,
    //         theme: 'error',
    //         pauseOnHover: true
    //       })
    //     })
    //     .finally(() => {
    //     })
    setSubmitting(false)
  }, [])

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
    })
  }, [])

  return (
    <div className={classes.divCard}>
      <HeaderAuth title="Criar conta">
        <Avatar className={classes.avatar}>
          <AccountBox />
        </Avatar>
      </HeaderAuth>

      <CardContent className={classes.cardContainer}>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{ email: '' }}>
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
