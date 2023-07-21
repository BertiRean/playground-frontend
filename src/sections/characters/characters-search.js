import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';

export const CharactersSearch = (props) => 
{
  const {onTextChange} = props;
  return (
    <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      onChange={onTextChange}
      placeholder="Search character"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
  );
}

CharactersSearch.propTypes = 
{
  onTextChange : PropTypes.func,
}
