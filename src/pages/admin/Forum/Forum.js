import React, { memo, useCallback, useMemo, useState, useEffect } from 'react'

import { useAsync } from 'react-async'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Container, Box, Typography, makeStyles, Paper, Grid, CircularProgress, Fab, Divider } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import * as forumsApi from 'api/forums'

import { useSnackbar } from 'utils'

import { useAuth } from 'providers/auth'

import ForumList from './ForumList'

const useStyles = makeStyles((theme) => ({
  boxHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(4, 0),
  },
  fab: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}))

const Forum = memo(() => {
  const classes = useStyles()

  const [forums, setForums] = useState([])

  const { userAuthenticated } = useAuth()

  const { createSnackbar } = useSnackbar()

  const { data: forumsData, isLoading, isFulfilled } = useAsync(forumsApi.listAllForums)

  useEffect(() => {
    if (isFulfilled) {
      setForums(forumsData)
    }
  }, [isFulfilled, forumsData])

  const validationSchema = useMemo(() => {
    return Yup.object({
      subject: Yup.string().required('Informe o assunto'),
    })
  }, [])

  const onSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      forumsApi
        .createForum({
          nome: values.subject,
          descricao: '',
          usuariaId: userAuthenticated.id,
        })
        .then((res) => {
          createSnackbar({
            message: 'Fórum adicionado com sucesso!',
            theme: 'success',
          })
          resetForm({})
          setForums((oldForums) => [...oldForums, res])
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
    [createSnackbar, userAuthenticated.id]
  )

  return (
    <Container>
      <Box my={2}>
        <Paper>
          <Box p={2}>
            <Typography>Fóruns</Typography>
          </Box>

          <Box px={2}>
            <Formik
              onSubmit={onSubmit}
              initialValues={{ subject: '' }}
              validationSchema={validationSchema}
              validateOnBlur={false}
            >
              {({ isSubmitting, isValid }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box display="flex">
                        <Field
                          variant="outlined"
                          margin="normal"
                          name="subject"
                          fullWidth
                          label="Assunto"
                          required
                          component={TextField}
                        />

                        <Box display="flex" justifyContent="center">
                          <Fab
                            type="submit"
                            color="primary"
                            className={classes.fab}
                            disabled={isSubmitting || !isValid}
                          >
                            <AddIcon />
                          </Fab>

                          {isSubmitting && (
                            <Grid item>
                              <CircularProgress size="2rem" />
                            </Grid>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>

          {isLoading && <CircularProgress />}

          {forums && forums.length > 0 ? (
            <>
              {forums.map((forum) => {
                return (
                  <Box key={forum.id}>
                    <ForumList forum={forum} />

                    <Divider />
                  </Box>
                )
              })}
            </>
          ) : (
            <Box p={2} display="flex" justifyContent="center">
              <Typography variant="h6">Nenhum fórum encontrado!</Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
})

export default Forum
