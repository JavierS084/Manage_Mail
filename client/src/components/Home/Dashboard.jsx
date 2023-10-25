import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

export function Dashboard() {
  return (
    <div><CircularProgress value={40} size='100px' color='blue.400'>
    <CircularProgressLabel>40%</CircularProgressLabel>
  </CircularProgress></div>
  )
}

export default Dashboard