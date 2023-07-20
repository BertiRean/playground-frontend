import PropTypes from 'prop-types';
import TrashIcon from '@heroicons/react/20/solid/TrashIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import { useRouter } from 'next/router';

export const CharacterCard = (props) => {
  const { character } = props;

  const router = useRouter();

  const onCardClick = (event) => {
    console.log(event);
    router.push({
      pathname : '/characters/prompts',
      query : character,
    })
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onClick={onCardClick}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            variant="rounded"
            src={character.logo}
            sx={{height : 86, width : 86}}
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {character.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {character.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <PencilIcon />
          </SvgIcon>

          <SvgIcon
            color="action"
            fontSize="small"
          >
            <TrashIcon />
          </SvgIcon>
        </Stack>
      </Stack>
    </Card>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired
};
