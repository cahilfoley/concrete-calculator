import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import Stack from '@mui/material/Stack'
import numeral from 'numeral'
import Screen from '../../components/Screen'
import Section from '../../components/Section'
import { useMaterialStore } from './store'
import { useMemo } from 'react'

const formatNumber = (value: number, precision = 1) =>
  numeral(value).format(`0[.]${'0'.repeat(precision)}`)

export function ConcreteCalculator() {
  const materials = useMaterialStore()

  // Calculation logic from here: https://theconstructor.org/concrete/calculate-quantities-of-materials-for-concrete/10700/?amp=1#Calculating_Quantities_of_Materials_for_per_cubic_meter_or_cubic_feet_orcubic_yards_concrete
  // Math solution logic from here: https://www.wolframalpha.com/input?i=+%280.45+*+x%29%2F1000+%2B+x%2F%281000*3.15%29+%2B+%281.7+*+x%29%2F%281000+*+2.6%29+%2B+%283.3+*+x%29%2F%281000+*+2.6%29+%3D+1
  const cementDryVolumeRatio =
    materials.cementRatio * materials.cementBulkDensity
  const sandDryVolumeRatio = materials.sandRatio * materials.sandBulkDensity
  const aggregateDryVolumeRatio =
    materials.aggregateRatio * materials.aggregateBulkDensity
  const cementMassRatio = 1
  const sandMassRatio = sandDryVolumeRatio / cementDryVolumeRatio
  const aggregateMassRatio = aggregateDryVolumeRatio / cementDryVolumeRatio

  const results = useMemo(() => {
    const cementDivisor = 1000 * materials.cementSpecificGravity
    const waterRatio = materials.waterCementRatio / 1000
    const sandRatio = sandMassRatio / (1000 * materials.sandSpecificGravity)
    const aggregateRatio =
      aggregateMassRatio / (1000 * materials.aggregateSpecificGravity)
    const scaledWaterRatio = waterRatio * cementDivisor
    const scaledSandRatio = sandRatio * cementDivisor
    const scaledAggregateRatio = aggregateRatio * cementDivisor
    const totalRatio =
      scaledWaterRatio + 1 + scaledSandRatio + scaledAggregateRatio
    const x = totalRatio / cementDivisor
    const kgsOfCement = materials.targetVolume / x
    const kgsOfSand = kgsOfCement * materials.sandRatio
    const kgsOfAggregate = kgsOfCement * materials.aggregateRatio
    return {
      kgsOfCement,
      cubesOfCement: kgsOfCement / materials.cementBulkDensity,
      kgsOfSand,
      cubesOfSand: kgsOfSand / materials.sandBulkDensity,
      kgsOfAggregate,
      cubesOfAggregate: kgsOfAggregate / materials.aggregateBulkDensity,
    }
  }, [aggregateMassRatio, sandMassRatio, cementMassRatio, materials])

  return (
    <Screen
      title="Concrete Calculator"
      actions={[
        <Button onClick={materials.resetDefaults}>Reset Defaults</Button>,
      ]}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Section title="Material Properties">
            <Stack spacing={2}>
              <TextField
                label="Cement Specific Gravity"
                value={materials.cementSpecificGravity}
                onChange={(event) =>
                  materials.setCementSpecificGravity(
                    parseFloat(event.target.value),
                  )
                }
                type="number"
                size="small"
              />
              <TextField
                label="Cement Bulk Density"
                value={materials.cementBulkDensity}
                onChange={(event) =>
                  materials.setCementBulkDensity(parseFloat(event.target.value))
                }
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg/m³</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Sand Specific Gravity"
                value={materials.sandSpecificGravity}
                onChange={(event) =>
                  materials.setSandSpecificGravity(
                    parseFloat(event.target.value),
                  )
                }
                type="number"
                size="small"
              />
              <TextField
                label="Sand Bulk Density"
                value={materials.sandBulkDensity}
                onChange={(event) =>
                  materials.setSandBulkDensity(parseFloat(event.target.value))
                }
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg/m³</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Aggregate Specific Gravity"
                value={materials.aggregateSpecificGravity}
                onChange={(event) =>
                  materials.setAggregateSpecificGravity(
                    parseFloat(event.target.value),
                  )
                }
                type="number"
                size="small"
              />
              <TextField
                label="Aggregate Bulk Density"
                value={materials.aggregateBulkDensity}
                onChange={(event) =>
                  materials.setAggregateBulkDensity(
                    parseFloat(event.target.value),
                  )
                }
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg/m³</InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Section>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Section title="Mix Properties">
            <Stack spacing={2}>
              <TextField
                label="Water Cement Ratio"
                value={materials.waterCementRatio}
                onChange={(event) =>
                  materials.setWaterCementRatio(parseFloat(event.target.value))
                }
                type="number"
                size="small"
              />
              <TextField
                label="Cement Ratio"
                value={materials.cementRatio}
                onChange={(event) =>
                  materials.setCementRatio(parseFloat(event.target.value))
                }
                type="number"
                size="small"
              />
              <TextField
                label="Sand Ratio"
                value={materials.sandRatio}
                onChange={(event) =>
                  materials.setSandRatio(parseFloat(event.target.value))
                }
                type="number"
                size="small"
              />
              <TextField
                label="Aggregate Ratio"
                value={materials.aggregateRatio}
                onChange={(event) =>
                  materials.setAggregateRatio(parseFloat(event.target.value))
                }
                type="number"
                size="small"
              />
              <TextField
                label="Ratio of Masses"
                value={`${formatNumber(cementMassRatio)}:${formatNumber(
                  sandMassRatio,
                )}:${formatNumber(aggregateMassRatio)}`}
                size="small"
                disabled
                helperText="The ratio of masses of materials for cement:sand:aggregate"
              />
            </Stack>
          </Section>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Section title="Quantities">
            <Stack spacing={2}>
              <TextField
                label="Concrete Volume"
                value={materials.targetVolume}
                onChange={(event) =>
                  materials.setTargetVolume(parseFloat(event.target.value))
                }
                type="number"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m³</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Cement"
                value={formatNumber(results.kgsOfCement, 2)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kgs</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Cement"
                value={formatNumber(results.cubesOfCement, 4)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m³</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Sand"
                value={formatNumber(results.kgsOfSand, 2)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kgs</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Sand"
                value={formatNumber(results.cubesOfSand, 4)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m³</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Aggregate"
                value={formatNumber(results.kgsOfAggregate, 2)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kgs</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Aggregate"
                value={formatNumber(results.cubesOfAggregate, 4)}
                size="small"
                disabled
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m³</InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Section>
        </Grid>
      </Grid>
    </Screen>
  )
}

export default ConcreteCalculator
