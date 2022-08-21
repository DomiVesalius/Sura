import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        div: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '80vh'
        }
    })
);

export default useStyles;
