/**
 * API functions for fetching aggregator data and metadata
 */

export interface Aggregator {
  id: string
  displayName: string
  logoUrl: string
}

/**
 * Fetches the list of available aggregators from the API
 * @returns Promise<Aggregator[]> - Array of aggregator metadata
 */
export const fetchAggregators = async (): Promise<Aggregator[]> => {
  try {
    const response = await fetch(
      'https://hyperevm.internal.oogabooga.io/aggregator/aggregators',
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch aggregators: ${response.status} ${response.statusText}`,
      )
    }

    return await response.json()
  } catch (error) {
    // Re-throw the error to let the caller handle it
    throw error
  }
}
