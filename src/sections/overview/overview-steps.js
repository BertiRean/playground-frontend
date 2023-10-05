import { Alert, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CharacterPrompt } from '../characters/character-prompt';
import { CharacterRepository } from 'src/lib/character/repositories/character.repositories';


export const OverviewSteps = (props) => {

  const {user, showWorldBuildingAlert, character, voices} = props;

  const [isOpen, setIsOpen] = useState(false);

  let show_popup = localStorage.getItem('show_popup');
  if(!show_popup){
    setIsOpen(true);
    localStorage.setItem('show_popup', true);
  }

  return (
    <Box sx={{width : '100%'}}>
      <Dialog open={isOpen}>
        <DialogTitle>Welcome {user.name} to Playground, a new tool to accelerate your creativity!
      </DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => (setIsOpen(false))}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {
        showWorldBuildingAlert && 
        <Alert severity='warning'>You will need create a Worldbuilding in order to use Dialogue Generator, you can do it {
          <Link href='/worldbuilding'>here</Link>
        }</Alert>
      }
      {
        character === null &&
        <Alert severity='warning'>Your character list is empty, you will need create one of them in order to use the Dialogue Generator,
        you can do it {<Link href='/characters/create'>here</Link>}
        </Alert>
      }
      <CharacterPrompt
        character={character}
        voices={voices}
        handleGenDialogue={CharacterRepository.getDialogue} 
        handleGenVoiceForLine={CharacterRepository.genVoiceForLine}
        handleRefinateLine={CharacterRepository.refinateLine}
      >

      </CharacterPrompt>
    </Box>
  )
}

OverviewSteps.propTypes = {
  user: PropTypes.object,
  showWorldBuildingAlert : PropTypes.bool.isRequired,
  character : PropTypes.object,
  voices : PropTypes.array,
};
