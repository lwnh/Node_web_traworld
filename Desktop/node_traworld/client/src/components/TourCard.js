import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        maxWidth: 300,
        margin: 10,
    },
    media: {
        width: 300,
        height: 200,
    },
});

const textCountry = {
    fontSize: "1.5rem",
}

const textDetail = {
    fontSize: "0.8rem",
    color: "gray",
}

function TourCard({ img, country, detail, onClick }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={onClick}>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title={country}
                />
                <CardContent>
                    <div style={textCountry}>{country}</div>
                    <div style={textDetail}>{detail}</div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">Reservation</Button>
                <Button size="small" color="primary">More</Button>
            </CardActions>
        </Card>
    )
}

export default TourCard
