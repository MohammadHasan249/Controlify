import React, { Component } from 'react';
import { Grid, Button, FormControl, FormHelperText, TextField, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';

export default class CreateRoomPage extends Component {

    defaultVotes = 2;

    constructor(props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };

        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestPauseChange = this.handleGuestPauseChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleVotesChange(e) {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestPauseChange(e) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false,
        });
    }

    handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };


        fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));

    }

    render() {

        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography component='h4' variant='h4'>
                        Create A Room
                    </Typography>
                </Grid>
                
                {/* the guest control playback state form */}
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <FormHelperText component="span">
                            <div align="center">
                                Guest Control of Playback State
                            </div>
                        </FormHelperText>

                        <RadioGroup row defaultValue="true" onChange={this.handleGuestPauseChange}>

                            <FormControlLabel value="true" 
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom" />
                            
                            <FormControlLabel value="false" 
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom" />

                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* the number of votes state form */}
                <Grid item xs={12} align="center">
                    <FormControl>

                        <TextField required={true} type="number" defaultValue={this.defaultVotes}
                            inputProps={{
                                min: 1,
                                style: {textAlign: "center"},
                            }}
                            onChange={this.handleVotesChange} />

                        <FormHelperText component="span">
                            <div align="center">Votes Required to Skip</div>
                        </FormHelperText>

                    </FormControl>
                </Grid>
                
                {/* the button to submit form */}
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleSubmit}>Create A Room</Button>
                </Grid>
                
                {/* the button to go back */} 
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            </Grid>
        );

    }

}