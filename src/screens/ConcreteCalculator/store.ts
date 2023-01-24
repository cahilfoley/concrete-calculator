import { create } from 'zustand'

interface MaterialState {
  cementSpecificGravity: number
  setCementSpecificGravity: (cementSpecificGravity: number) => any
  sandSpecificGravity: number
  setSandSpecificGravity: (sandSpecificGravity: number) => any
  aggregateSpecificGravity: number
  setAggregateSpecificGravity: (aggregateSpecificGravity: number) => any
  waterCementRatio: number
  setWaterCementRatio: (waterCementRatio: number) => any
  cementRatio: number
  setCementRatio: (cementRatio: number) => any
  sandRatio: number
  setSandRatio: (sandRatio: number) => any
  aggregateRatio: number
  setAggregateRatio: (aggregateRatio: number) => any
  cementBulkDensity: number
  setCementBulkDensity: (cementBulkDensity: number) => any
  sandBulkDensity: number
  setSandBulkDensity: (sandBulkDensity: number) => any
  aggregateBulkDensity: number
  setAggregateBulkDensity: (aggregateBulkDensity: number) => any
  targetVolume: number
  setTargetVolume: (targetVolume: number) => any
}

export const useMaterialStore = create<MaterialState>((set) => ({
  cementSpecificGravity: 3.15,
  setCementSpecificGravity: (cementSpecificGravity) =>
    set({ cementSpecificGravity }),
  sandSpecificGravity: 2.6,
  setSandSpecificGravity: (sandSpecificGravity) => set({ sandSpecificGravity }),
  aggregateSpecificGravity: 2.6,
  setAggregateSpecificGravity: (aggregateSpecificGravity) =>
    set({ aggregateSpecificGravity }),
  waterCementRatio: 0.45,
  setWaterCementRatio: (waterCementRatio) => set({ waterCementRatio }),
  cementRatio: 1,
  setCementRatio: (cementRatio) => set({ cementRatio }),
  sandRatio: 2,
  setSandRatio: (sandRatio) => set({ sandRatio }),
  aggregateRatio: 3,
  setAggregateRatio: (aggregateRatio) => set({ aggregateRatio }),
  cementBulkDensity: 1500,
  setCementBulkDensity: (cementBulkDensity) => set({ cementBulkDensity }),
  sandBulkDensity: 1700,
  setSandBulkDensity: (sandBulkDensity) => set({ sandBulkDensity }),
  aggregateBulkDensity: 1650,
  setAggregateBulkDensity: (aggregateBulkDensity) =>
    set({ aggregateBulkDensity }),
  targetVolume: 1,
  setTargetVolume: (targetVolume) => set({ targetVolume }),
}))
