import React, { memo, useMemo } from 'react'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Box, Typography, makeStyles, Avatar, Grid, Fab, CircularProgress } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(2),
  },

  boxSubject: {
    display: 'flex',
    flexDirection: 'row',
  },

  boxLogo: {
    marginRight: theme.spacing(2),
  },

  logotipo: {
    maxHeight: '100px',
  },

  boxContent: {
    display: 'flex',
  },

  discussion: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 6),
  },

  discussionHeader: {
    padding: theme.spacing(2, 6),
  },

  fab: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}))

const ForumList = memo(({ forum, onSubmit }) => {
  const classes = useStyles()

  const validationSchema = useMemo(() => {
    return Yup.object({
      answer: Yup.string().required('Informe a resposta'),
    })
  }, [])

  return (
    <Box className={classes.box}>
      <Box className={classes.boxSubject}>
        <Box className={classes.boxLogo}>
          <Avatar className={classes.avatar}>
            <img src={forum.image} alt="Dona" className={classes.logotipo} />
          </Avatar>
        </Box>

        <Box>
          <Typography variant="h6">{forum.subject}</Typography>
        </Box>
      </Box>

      <Box className={classes.discussionHeader}>
        <Typography variant="h6">Respostas</Typography>
      </Box>

      {forum.discussion.map(() => {
        return (
          <Box className={classes.discussion}>
            <Box className={classes.boxLogo}>
              <Avatar className={classes.avatar}>
                <img src={forum.user.image} alt={forum.user.name} className={classes.logotipo} />
              </Avatar>
            </Box>

            <Box>
              <Typography variant="h6">{forum.subject}</Typography>
            </Box>
          </Box>
        )
      })}

      <Box px={2}>
        <Formik
          onSubmit={onSubmit}
          initialValues={{ answer: '' }}
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
                      name="answer"
                      fullWidth
                      label="Resposta"
                      required
                      component={TextField}
                    />

                    <Box display="flex" justifyContent="center">
                      <Fab type="submit" color="primary" className={classes.fab} disabled={isSubmitting || !isValid}>
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
    </Box>
  )
})

export default ForumList
