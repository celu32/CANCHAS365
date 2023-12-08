import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Container } from '@mui/material';



const ImageModal = ({ images }) => {
 
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Container maxWidth="xl" sx={{
      textAlign: 'left',
      margin: '0px',
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor:'#FFFFFF'
      
    }}>

      <Box sx={{
        textAlign: 'left',
        margin: '10px',
        marginRight:'150px',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor:'#FFFFFF'
        
      }}>
        <Button
          variant="contained"
          sx={{
            padding: '10px',
            backgroundColor:'#1F2E7B',
            border:'solid 3px #FF914D',
            color:'#ffffff',
            ':hover': {
              backgroundColor:'#EDEBEE',
              color: '#1F2E7B'
            } 
          }}
          onClick={handleOpen}
        >
          Ver Más
        </Button>
      </Box>


      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ margin: '50px' }}
        fullScreen={true}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers={scroll === 'paper'} sx={{ padding: '30px' }}>
          <Box
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}

          >
            <ImageList variant="masonry" cols={3} gap={8} >
              {
                images?.map((image) => (
                  <ImageListItem key={image.id}>
                    <img
                      src={image.url}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              }
            </ImageList>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ImageModal