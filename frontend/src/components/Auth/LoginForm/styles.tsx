import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loginFormDiv: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '80vh'
        },

        loginForm: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 'fit-content',
            padding: '2em',
            // border: 'solid 1px silver',
            // borderRadius: '5px'
        },
    })
);

export default useStyles;
