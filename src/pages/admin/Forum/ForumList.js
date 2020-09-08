import React, { memo, useMemo, useCallback, useState, useEffect } from 'react'

import { useAsync } from 'react-async'

import moment from 'moment'
import 'moment/locale/pt-br'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'

import { Box, Typography, makeStyles, Avatar, Grid, Fab, CircularProgress } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'

import * as forumsApi from 'api/forums'

import { useSnackbar } from 'utils'

import { useAuth } from 'providers/auth'

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

  title: {
    fontWeight: theme.typography.fontWeightBold,
  },

  discussion: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(0, 6),
    marginBottom: theme.spacing(3),
  },

  discussionHeader: {
    padding: theme.spacing(2, 6),
  },

  fab: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}))

const ForumList = memo(({ forum }) => {
  const classes = useStyles()

  const [discussions, setDiscussions] = useState([])

  const { userAuthenticated } = useAuth()

  const { createSnackbar } = useSnackbar()

  const { data: discussionsData, isLoading, isFulfilled } = useAsync(forumsApi.findDiscussionByForumId, {
    id: forum.id,
  })

  useEffect(() => {
    if (isFulfilled) {
      setDiscussions(discussionsData)
    }
  }, [isFulfilled, discussionsData])

  const validationSchema = useMemo(() => {
    return Yup.object({
      answer: Yup.string().required('Informe a resposta'),
    })
  }, [])

  const onSubmit = useCallback(
    (values, { setSubmitting, resetForm }) => {
      forumsApi
        .createDiscussion({
          data: moment(),
          descricao: values.answer,
          forumId: forum.id,
          usuariaId: userAuthenticated.id,
        })
        .then((res) => {
          createSnackbar({
            message: 'Resposta adicionada com sucesso!',
            theme: 'success',
          })
          resetForm({})
          setDiscussions((oldDiscussions) => [...oldDiscussions, res])
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
    [createSnackbar, userAuthenticated.id, forum.id]
  )

  return (
    <Box className={classes.box}>
      <Box className={classes.boxSubject}>
        <Box className={classes.boxLogo}>
          <Avatar className={classes.avatar}>
            <img
              src={`https://source.unsplash.com/1600x900/?woman-face${forum.id}`}
              alt="Usuária"
              className={classes.logotipo}
            />
          </Avatar>
        </Box>

        <Box>
          <Typography className={classes.title} variant="h5">
            {forum.nome}
          </Typography>
        </Box>
      </Box>

      {isLoading && <CircularProgress />}

      <Box className={classes.discussionHeader}>
        <Typography variant="h6">Respostas</Typography>
      </Box>

      {discussions &&
        discussions.length > 0 &&
        discussions.map((discussion) => {
          return (
            <Box key={discussion.id} className={classes.discussion}>
              <Box className={classes.boxLogo}>
                <Avatar className={classes.avatar}>
                  <img
                    className={classes.img}
                    alt="Usuária"
                    src={`https://source.unsplash.com/1600x900/?woman-face${discussion.id}`}
                  />
                </Avatar>
              </Box>

              <Box>
                <Typography variant="h6">{discussion.descricao}</Typography>
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
