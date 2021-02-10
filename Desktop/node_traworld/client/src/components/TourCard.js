import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';

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
    marginBottom: "1rem",
    fontSize: "0.8rem",
    color: "gray",
}

const textPrice = {
    marginLeft: "0.2rem",
    fontSize: "1.0rem",
}

function TourCard({ img, country, detail, rating, price, onClick }) {
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
                    <Rating
                        name="feedback"
                        value={rating}
                        size="small"
                        precision={0.5}
                        readOnly
                    />
                    <div style={textPrice}>{price}</div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TourCard
