import React, { memo, useCallback, useMemo, useState } from 'react'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Container, Box, Typography, makeStyles, Paper, Grid, CircularProgress, Fab, Divider } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
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

  const validationSchema = useMemo(() => {
    return Yup.object({
      subject: Yup.string().required('Informe o assunto'),
    })
  }, [])

  const onSubmit = useCallback(
    (values, formik) => {
      const newForum = {
        id: forums.length + 1,
        subject: values.subject,
        user: {
          name: 'Maria',
          image: 'https://source.unsplash.com/mEZ3PoFGs_k',
        },
        discussion: [],
      }

      setForums((oldForums) => [...oldForums, newForum])
      formik.setSubmitting(false)
      formik.resetForm({})
    },
    [forums.length]
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
