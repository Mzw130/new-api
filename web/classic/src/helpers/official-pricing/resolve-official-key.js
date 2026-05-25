/*
Copyright (C) 2025 QuantumNous

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

const SUFFIX_DELIMS = /^[-_/.@#]+/;

/**
 * Map a channel-facing model id to a models.dev key (exact or heuristic for redirects).
 */
export function resolveOfficialModelKey(
  channelModel,
  officialKeysSortedLongestFirst,
) {
  if (!channelModel) return null;

  if (officialKeysSortedLongestFirst.includes(channelModel)) {
    return channelModel;
  }

  for (const key of officialKeysSortedLongestFirst) {
    if (channelModel === key) return key;
    if (channelModel.startsWith(key)) {
      const rest = channelModel.slice(key.length);
      if (rest.length > 0 && SUFFIX_DELIMS.test(rest)) {
        return key;
      }
    }
  }

  const lower = channelModel.toLowerCase();
  for (const key of officialKeysSortedLongestFirst) {
    if (key.toLowerCase() === lower) return key;
    if (lower.startsWith(key.toLowerCase())) {
      const rest = channelModel.slice(key.length);
      if (rest.length > 0 && SUFFIX_DELIMS.test(rest)) {
        return key;
      }
    }
  }

  return null;
}
