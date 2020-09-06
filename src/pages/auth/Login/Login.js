import React, { memo, useMemo, useCallback } from 'react'

import { useHistory } from 'react-router'
// import { useAuth } from '../../../providers/auth'
// import { useSnackbar } from '../../../utils/hooks/useSnackbar'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Avatar, Button, CircularProgress, Grid, makeStyles } from '@material-ui/core'

import LockIcon from '@material-ui/icons/Lock'

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
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.common.white,
      borderRadius: '4px',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    },
  },
  cardContainer: {
    padding: theme.spacing(0, 2, 2, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  createAccount: {
    margin: theme.spacing(2, 0, 2),
  },
}))

const Login = memo(() => {
  // const { login } = useAuth()
  // const { createSnackbar } = useSnackbar()
  const classes = useStyles()
  const history = useHistory()

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string().email('E-mail inválido').required('Informe o e-mail'),
      senha: Yup.string().required('Informe a senha').min(8, 'Mínimo 8 caracteres'),
    })
  }, [])

  const handleSubmit = useCallback((values, formik) => {
    // login(values).catch((e) => {
    //   if (e.response) {
    //     formik.setFieldError('senha', e.response ? e.response.data.message : e)
    //   } else {
    //     createSnackbar({
    //       message: 'Falha na comunicação com o servidor',
    //       theme: 'error',
    //       pauseOnHover: true,
    //     })
    //   }

    // })
    formik.setSubmitting(false)
  }, [])

  return (
    <div className={classes.divCard}>
      <HeaderAuth title="Login" icon={LockIcon}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
      </HeaderAuth>

      <div className={classes.cardContainer}>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={{ email: '', senha: '' }}>
          {({ isSubmitting, isValid }) => (
            <Form noValidate className={classes.form}>
              <Grid container spacing={2}>
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
                  <Button
                    className={classes.submit}
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={isSubmitting || !isValid}
                  >
                    Acessar
                  </Button>
                </Grid>
                {isSubmitting && (
                  <Grid item>
                    <CircularProgress size="2rem" />
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              className={classes.createAccount}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => history.push('/auth/create-account')}
            >
              Fazer meu cadastro
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button color="primary" size="small" onClick={() => history.push('/auth/recover-password')}>
              Esqueceu a senha?
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
})

export default Login
