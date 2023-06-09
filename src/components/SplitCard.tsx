import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React from 'react'

export type SplitCardProps = React.PropsWithChildren<{
  title: string
  subtitle?: string
}>

export function SplitCard(props: SplitCardProps) {
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">{props.title}</Typography>
            {props.subtitle && (
              <Typography variant="body2">{props.subtitle}</Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            {props.children}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SplitCard
