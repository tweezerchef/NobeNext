import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


export const SideBarCard = styled(Card)({
    width: 180,
    height: 140,
    padding:1,
    margin:1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(0deg, rgba(195, 34, 74, 0.205) 0%, rgba(248, 226, 153, 0.315) 100%)"


});

export const ReviewBox = styled(Box)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'98%',
})

export const ReviewPopOver = styled(Popover)({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    p:2,
    '.MuiPopover-paper': {
        overflowY: 'auto',
        width: '400px',
        maxHeight: '200px',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
    },
    backgroundColor: 'transparent',
})

export const ReviewTypography = styled(Typography)({
    backgroundColor: '#ffffe0ce',
    p: 4,
    margin: 8,
    cursor: 'pointer',
})

