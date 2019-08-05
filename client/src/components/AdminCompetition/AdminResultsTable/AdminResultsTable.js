import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';

import ResultWithRecordTag from '../../ResultWithRecordTag/ResultWithRecordTag';
import { times } from '../../../logic/utils';
import { formatResult } from '../../../logic/results';
import { statsToDisplay } from '../../../logic/results-table-utils';

const useStyles = makeStyles(theme => ({
  row: {
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  },
  ranking: {
    maxWidth: 75,
  },
  advancable: {
    backgroundColor: green['A400'],
  },
  mainStat: {
    fontWeight: 600,
  },
}));

const AdminResultsTable = React.memo(
  ({ results, format, eventId, competitionId, onResultClick }) => {
    const classes = useStyles();

    const stats = statsToDisplay(format, eventId);

    return (
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="right" className={classes.ranking}>
              #
            </TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell>Name</TableCell>
            {times(format.solveCount, index => (
              <TableCell key={index} align="right">
                {index + 1}
              </TableCell>
            ))}
            {stats.map(({ name }) => (
              <TableCell key={name} align="right">
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(result => (
            <TableRow
              key={result.person.id}
              hover
              className={classes.row}
              onClick={event => onResultClick(result, event)}
            >
              <TableCell
                align="right"
                className={classNames(classes.ranking, {
                  [classes.advancable]: result.advancable,
                })}
              >
                {result.ranking}
              </TableCell>
              <TableCell align="right">{result.person.id}</TableCell>
              <TableCell>{result.person.name}</TableCell>
              {times(format.solveCount, index => (
                <TableCell key={index} align="right">
                  {formatResult(result.attempts[index] || 0, eventId)}
                </TableCell>
              ))}
              {stats.map(({ name, fn, type }, index) => (
                <TableCell
                  key={name}
                  align="right"
                  className={classNames({
                    [classes.mainStat]: index === 0,
                  })}
                >
                  <ResultWithRecordTag
                    result={formatResult(
                      fn(result.attempts, eventId),
                      eventId,
                      type === 'average'
                    )}
                    recordTag={result.recordTags[type]}
                    showPb={false}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

export default AdminResultsTable;
