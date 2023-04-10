import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MaterialState {
  cementSpecificGravity: number
  setCementSpecificGravity: (cementSpecificGravity: number) => void
  sandSpecificGravity: number
  setSandSpecificGravity: (sandSpecificGravity: number) => void
  aggregateSpecificGravity: number
  setAggregateSpecificGravity: (aggregateSpecificGravity: number) => void
  waterCementRatio: number
  setWaterCementRatio: (waterCementRatio: number) => void
  cementRatio: number
  setCementRatio: (cementRatio: number) => void
  sandRatio: number
  setSandRatio: (sandRatio: number) => void
  aggregateRatio: number
  setAggregateRatio: (aggregateRatio: number) => void
  cementBulkDensity: number
  setCementBulkDensity: (cementBulkDensity: number) => void
  sandBulkDensity: number
  setSandBulkDensity: (sandBulkDensity: number) => void
  aggregateBulkDensity: number
  setAggregateBulkDensity: (aggregateBulkDensity: number) => void
  targetVolume: number
  setTargetVolume: (targetVolume: number) => void
  resetDefaults: () => void
}

const defaults = {
  cementSpecificGravity: 3.15,
  sandSpecificGravity: 2.6,
  aggregateSpecificGravity: 2.6,
  waterCementRatio: 0.45,
  cementRatio: 1,
  sandRatio: 2,
  aggregateRatio: 3,
  cementBulkDensity: 1500,
  sandBulkDensity: 1700,
  aggregateBulkDensity: 1650,
  targetVolume: 1,
} as const

export const useMaterialStore = create<MaterialState>()(
  persist(
    (set) => ({
      ...defaults,
      setCementSpecificGravity: (cementSpecificGravity) =>
        set({ cementSpecificGravity }),
      setSandSpecificGravity: (sandSpecificGravity) =>
        set({ sandSpecificGravity }),
      setAggregateSpecificGravity: (aggregateSpecificGravity) =>
        set({ aggregateSpecificGravity }),
      setWaterCementRatio: (waterCementRatio) => set({ waterCementRatio }),
      setCementRatio: (cementRatio) => set({ cementRatio }),
      setSandRatio: (sandRatio) => set({ sandRatio }),
      setAggregateRatio: (aggregateRatio) => set({ aggregateRatio }),
      setCementBulkDensity: (cementBulkDensity) => set({ cementBulkDensity }),
      setSandBulkDensity: (sandBulkDensity) => set({ sandBulkDensity }),
      setAggregateBulkDensity: (aggregateBulkDensity) =>
        set({ aggregateBulkDensity }),
      setTargetVolume: (targetVolume) => set({ targetVolume }),
      resetDefaults: () => set(defaults),
    }),
    { name: 'material-store' },
  ),
)
