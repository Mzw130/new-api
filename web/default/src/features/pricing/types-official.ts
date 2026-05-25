/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

export type OfficialPriceEntry = {
  input_per_m: number
  output_per_m?: number
  cache_read_per_m?: number
  provider?: string
}

export type OfficialPlatformVariant = {
  model_name: string
  input_per_m: number
  output_per_m?: number
}

export type OfficialCompareRow = {
  canonical_key: string
  vendor_name?: string
  vendor_icon?: string
  official?: OfficialPriceEntry | null
  platform_input_per_m: number
  platform_output_per_m?: number
  discount_percent?: number | null
  variant_count: number
  variants?: OfficialPlatformVariant[]
  quota_type: number
}

export type OfficialCompareResponse = {
  success: boolean
  message?: string
  data?: {
    source: string
    rows: OfficialCompareRow[]
    updated: number
  }
}
