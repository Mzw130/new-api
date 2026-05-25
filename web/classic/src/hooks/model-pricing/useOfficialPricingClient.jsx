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

import { useEffect, useMemo, useRef, useState } from 'react';
import { buildOfficialPriceByModels } from '../../helpers/official-pricing/build-model-official-prices';
import { fetchModelsDevOfficialPrices } from '../../helpers/official-pricing/models-dev';

const STALE_MS = 10 * 60 * 1000;

let sharedCache = {
  prices: null,
  fetchedAt: 0,
  promise: null,
};

async function loadOfficialPricesCached() {
  const now = Date.now();
  if (sharedCache.prices && now - sharedCache.fetchedAt < STALE_MS) {
    return sharedCache.prices;
  }
  if (sharedCache.promise) {
    return sharedCache.promise;
  }
  sharedCache.promise = fetchModelsDevOfficialPrices()
    .then((prices) => {
      sharedCache.prices = prices;
      sharedCache.fetchedAt = Date.now();
      sharedCache.promise = null;
      return prices;
    })
    .catch((err) => {
      sharedCache.promise = null;
      throw err;
    });
  return sharedCache.promise;
}

export function useOfficialPricingClient(models, groupRatio, enabled = true) {
  const [officialPrices, setOfficialPrices] = useState(
    () => sharedCache.prices,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const prices = await loadOfficialPricesCached();
        if (!cancelled && mountedRef.current) {
          setOfficialPrices(prices);
        }
      } catch (e) {
        if (!cancelled && mountedRef.current) {
          setError(e);
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const officialByModel = useMemo(() => {
    if (!officialPrices) return new Map();
    return buildOfficialPriceByModels(models, groupRatio, officialPrices);
  }, [models, groupRatio, officialPrices]);

  return {
    officialByModel,
    isLoading,
    error,
  };
}
