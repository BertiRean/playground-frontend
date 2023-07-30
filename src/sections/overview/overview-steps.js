import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { CharacterPrompt } from '../characters/character-prompt';
import { CharacterPromptDefault } from '../characters/character-default';
import { useState } from 'react';


export const OverviewSteps = (props) => {

  const steps = [
    'Create a World Context',
    'Create a Character',
    'You\'re ready, now try generate dialogue quotes'
  ]

  const username = "Gabriela Bohorquez"
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box sx={{width : '100%'}}>
      <Dialog open={isOpen}>
        <DialogTitle>Welcome to your tool {username}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We're happy that you choose our tool, 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => (setIsOpen(false))}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      <Alert severity='warning'>You need create a worldbuilding</Alert>
      <Alert severity='warning'>Your don't have characters created</Alert>
      <CharacterPromptDefault></CharacterPromptDefault>
    </Box>
  )
}