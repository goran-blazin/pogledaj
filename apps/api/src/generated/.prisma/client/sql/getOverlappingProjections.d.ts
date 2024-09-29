import * as $runtime from "@prisma/client/runtime/library"

/**
 * @param text
 * @param timestamptz
 * @param timestamptz
 */
export const getOverlappingProjections: (text: string, timestamptz: Date, timestamptz: Date) => $runtime.TypedSql<getOverlappingProjections.Parameters, getOverlappingProjections.Result>

export namespace getOverlappingProjections {
  export type Parameters = [text: string, timestamptz: Date, timestamptz: Date]
  export type Result = {
    projectionId: string
    startDateTime: Date
    runtimeMinutes: number
    movieName: string
    endDateTime: Date | null
  }
}
