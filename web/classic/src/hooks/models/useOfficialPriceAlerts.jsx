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

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  acknowledgeOfficialPriceSnapshot,
  fetchOfficialPriceChanges,
} from '../../helpers/official-pricing/models-dev-snapshot';

const DISMISS_STORAGE_KEY = 'official-price-alerts-dismissed';

function fingerprintChanges(changes) {
  return changes
    .map(
      (c) =>
        `${c.canonical_key}:${c.field}:${c.old_value}:${c.new_value}`,
    )
    .join('|');
}

function readDismissedFingerprint() {
  try {
    return localStorage.getItem(DISMISS_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeDismissedFingerprint(fp) {
  try {
    localStorage.setItem(DISMISS_STORAGE_KEY, fp);
  } catch {
    /* ignore */
  }
}

export function useOfficialPriceAlerts(enabled = true) {
  const [changes, setChanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAcking, setIsAcking] = useState(false);
  const [dismissedFp, setDismissedFp] = useState(() =>
    readDismissedFingerprint(),
  );

  useEffect(() => {
    if (!enabled) return undefined;

    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOfficialPriceChanges();
        if (!cancelled) setChanges(data);
      } catch {
        if (!cancelled) setChanges([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const fp = useMemo(() => fingerprintChanges(changes), [changes]);

  const shouldShowAlert =
    enabled &&
    !isLoading &&
    changes.length > 0 &&
    fp.length > 0 &&
    dismissedFp !== fp;

  const dismiss = useCallback(() => {
    writeDismissedFingerprint(fp);
    setDismissedFp(fp);
  }, [fp]);

  const acknowledge = useCallback(async () => {
    setIsAcking(true);
    try {
      await acknowledgeOfficialPriceSnapshot();
      writeDismissedFingerprint(fp);
      setDismissedFp(fp);
      setChanges([]);
    } finally {
      setIsAcking(false);
    }
  }, [fp]);

  return {
    changes,
    shouldShowAlert,
    isLoading,
    isAcking,
    dismiss,
    acknowledge,
  };
}
