import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core/';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PollTittle from '../../Message/PollTittle'
import CountdownClock from '../../Countdown'
import DashedLine from '../../pages/Effects/DashedLine'
import ResponsivePie from '../../Chart'

import './styles.css'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '8px solid #ececec',
        boxShadow: theme.shadows[5],
        margin: '0 auto',
        borderRadius: '5px',
        maxWidth: '725px',
        width: '100%',
        position: "relative",
    },
}));

export default function AnimatedModal({ openModal, updateModal, pollData, optionIndex}) {
    const classes = useStyles();
    const [open, setOpen] = useState(openModal);
    const optionsData = pollData.choices
    const pollId = pollData._id

    useEffect(() => {
        setOpen(openModal)
      }, [openModal]);

    const handleClose = () => {
        updateModal(false)
        setOpen(false);
    };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={`${classes.paper} fade-material`}>
                    <button className="button" onClick={handleClose}>
                        <span className="icon"></span>
                    </button>

                    <section className={"feedback-wrapper"}>
                        <section className={"feedback-main-content"}>
                            <PollTittle />
                            <DashedLine />

                            <p className={"feedback-message"}>
                                <span>Parabéns!</span> Seu voto para o <span>Participante {optionIndex}</span> foi enviado com sucesso!
                            </p>

                            <section className={"teste"}>
                                {optionsData && optionsData.map((option) => (
                                    <article className="avatar-content" key={option._id}>
                                        <picture>
                                            <img className="option-avatar" style={{border: "none"}} alt={option.name} src={option.avatar} id={option._id} />
                                        </picture>
                                    </article>
                                ))}
                            </section>
                            <ResponsivePie pollId={pollId} pollOptionsData={optionsData}/>
                            <div className={"poll-statistics-wrapper"}>
                                <div className={"poll-remain-time"}>
                                    <CountdownClock pollId={pollId}/>
                                </div>
                            </div>
                            </section>
                    </section>
                    </div>
                </Fade>
            </Modal>
        </>
    );
}