import {Alert, Slide } from "@mui/material"

export const TimerAlert = ({
  show = false,
  text = "",
  fadingTime = 5000,
  onTransitionEnd = (e) => {},
  onAlertClose = (e) => {},
  ...props
}) => {

  return (
    <Slide direction='down' in={show} onTransitionEnd={(e) => {
      setTimeout(() => { onTransitionEnd(e)}, fadingTime)
    }}>
      <Alert onClose={(e) => onAlertClose(e)}>{text}</Alert>
    </Slide>
  )
}