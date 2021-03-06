import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PublicIcon from '@material-ui/icons/Public';

import FlagIcon from '../FlagIcon/FlagIcon';
import VirtualList from '../VirtualList/VirtualList';
import { formatDateRange } from '../../logic/date';

const CompetitionList = ({ title, competitions }) => {
  return (
    <List dense={true} disablePadding>
      {title && <ListSubheader disableSticky>{title}</ListSubheader>}
      <VirtualList
        height={300}
        itemHeigh={60}
        items={competitions}
        renderItem={(competition, { style }) => (
          <ListItem
            key={competition.id}
            style={style}
            button
            component={Link}
            to={`/competitions/${competition.id}`}
          >
            <ListItemIcon>
              {competition.countries.length === 1 ? (
                <FlagIcon
                  code={competition.countries[0].iso2.toLowerCase()}
                  size="lg"
                />
              ) : (
                <PublicIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={competition.name}
              secondary={formatDateRange(
                competition.schedule.startDate,
                competition.schedule.endDate
              )}
            />
          </ListItem>
        )}
      />
    </List>
  );
};

export default CompetitionList;
