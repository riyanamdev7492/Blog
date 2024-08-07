import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useMutation } from 'react-query';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};

const updateArticle = async (article) => {
  const response = await axios.put(`http://127.0.0.1:8000/api/articles/${article.id}`, article);
  return response.data;
};

const UpdateArticle = ({ open, handleClose, articleToUpdate, refetchArticles }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (articleToUpdate) {
      setTitle(articleToUpdate.title || '');
      setBody(articleToUpdate.body || '');
    }
  }, [articleToUpdate]);

  const mutation = useMutation(updateArticle, {
    onSuccess: () => {
      refetchArticles();
      handleClose();
    }
  });

  const handleUpdate = () => {
    mutation.mutate({ ...articleToUpdate, title, body });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Article
          </Typography>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Body"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={handleUpdate} className='bg-purple-700 px-3 rounded-md py-2 text-white'>
            Update
          </button>
          <button onClick={handleClose} className='ml-3 px-3 rounded-md py-2 text-white bg-red-600'>
            Close
          </button>
        </Box>
      </Modal>
    </>
  );
}

export default UpdateArticle;
