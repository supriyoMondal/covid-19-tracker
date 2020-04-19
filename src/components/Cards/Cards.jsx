import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './Cards.module.css'
import { Grid } from '@material-ui/core';
import CountUp from 'react-countup'
import CircularProgress from '@material-ui/core/CircularProgress';
import cx from 'classnames'

const getDate = (date) => (
    new Date(date).toDateString()
)

const Cards = ({ data: { deaths, recovered, confirmed, lastUpdate } }) => {

    if (!deaths || !recovered || !confirmed || !lastUpdate) {
        return (
            <div className={styles.container}>
                <CircularProgress color="secondary" />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card}
                    className={cx(styles.card, styles.infected)}
                    xs={12} sm={3}>
                    <CardContent>
                        <Typography color="textSecondary"
                            gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={confirmed}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary'>
                            {getDate(lastUpdate)}
                        </Typography>
                        <Typography variant="body2">
                            Number of active cases of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}
                    className={cx(styles.card, styles.recovered)}
                    xs={12} sm={3}>
                    <CardContent>
                        <Typography color="textSecondary"
                            gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={recovered}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                        <Typography color='textSecondary'>
                            {getDate(lastUpdate)}
                        </Typography>
                        <Typography variant="body2">
                            Number of recoveries of COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card}
                    className={cx(styles.card, styles.deaths)}
                    xs={12} sm={3}>
                    <CardContent>
                        <Typography color="textSecondary"
                            gutterBottom>Deaths</Typography>
                        <Typography variant="h5"> <CountUp
                            start={0}
                            end={deaths}
                            duration={1.5}
                            separator=","
                        /> </Typography>
                        <Typography color='textSecondary'>
                            {getDate(lastUpdate)}
                        </Typography>
                        <Typography variant="body2">
                            Number of deaths caused by COVID-19
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
