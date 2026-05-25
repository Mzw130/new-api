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

import React, { useState, useEffect } from 'react';
import { useOfficialPriceAlerts } from '../../../hooks/models/useOfficialPriceAlerts';
import OfficialPriceAlertModal from './modals/OfficialPriceAlertModal';

const OfficialPriceAlertHost = ({ enabled = true, displayPrice, t }) => {
  const { changes, shouldShowAlert, isAcking, dismiss, acknowledge } =
    useOfficialPriceAlerts(enabled);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldShowAlert) {
      setVisible(true);
    }
  }, [shouldShowAlert]);

  if (!shouldShowAlert && !visible) {
    return null;
  }

  return (
    <OfficialPriceAlertModal
      visible={visible}
      onClose={() => setVisible(false)}
      changes={changes}
      onAcknowledge={acknowledge}
      onDismiss={dismiss}
      isAcking={isAcking}
      displayPrice={displayPrice}
      t={t}
    />
  );
};

export default OfficialPriceAlertHost;
