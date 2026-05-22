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

export function setStatusData(data) {
  localStorage.setItem('status', JSON.stringify(data));
  const name = data.system_name;
  if (name != null && String(name).trim() !== '') {
    localStorage.setItem('system_name', String(name).trim());
  } else {
    localStorage.removeItem('system_name');
  }
  const logo = data.logo;
  if (logo != null && String(logo).trim() !== '') {
    localStorage.setItem('logo', String(logo).trim());
  } else {
    localStorage.removeItem('logo');
  }
  localStorage.setItem('footer_html', data.footer_html);
  localStorage.setItem('quota_per_unit', data.quota_per_unit);
  localStorage.setItem('display_in_currency', data.display_in_currency);
  localStorage.setItem('quota_display_type', data.quota_display_type || 'USD');
  localStorage.setItem('enable_drawing', data.enable_drawing);
  localStorage.setItem('enable_task', data.enable_task);
  localStorage.setItem('enable_data_export', data.enable_data_export);
  localStorage.setItem('chats', JSON.stringify(data.chats));
  localStorage.setItem(
    'data_export_default_time',
    data.data_export_default_time,
  );
  localStorage.setItem(
    'default_collapse_sidebar',
    data.default_collapse_sidebar,
  );
  localStorage.setItem('mj_notify_enabled', data.mj_notify_enabled);
  if (data.chat_link) {
    // localStorage.setItem('chat_link', data.chat_link);
  } else {
    localStorage.removeItem('chat_link');
  }
  if (data.chat_link2) {
    // localStorage.setItem('chat_link2', data.chat_link2);
  } else {
    localStorage.removeItem('chat_link2');
  }
  if (data.docs_link) {
    localStorage.setItem('docs_link', data.docs_link);
  } else {
    localStorage.removeItem('docs_link');
  }
}

export async function loadConfigJson() {
  try {
    const res = await fetch('/config.json');
    if (!res.ok) return;
    const config = await res.json();
    const status = JSON.parse(localStorage.getItem('status') || '{}');
    // 非空字符串或布尔值才覆盖
    Object.keys(config).forEach((key) => {
      const val = config[key];
      if (val !== '' && val !== null && val !== undefined) {
        status[key] = val;
      }
    });
    localStorage.setItem('status', JSON.stringify(status));
    // 同步更新单独的 localStorage key
    if (config.system_name) localStorage.setItem('system_name', config.system_name);
    if (config.logo !== undefined && config.logo !== null) localStorage.setItem('logo', config.logo);
    if (config.footer_html !== undefined && config.footer_html !== null) localStorage.setItem('footer_html', config.footer_html);
    if (config.docs_link) localStorage.setItem('docs_link', config.docs_link);
    if (config.quota_display_type) localStorage.setItem('quota_display_type', config.quota_display_type);
    if (config.display_in_currency !== undefined) localStorage.setItem('display_in_currency', config.display_in_currency);
    return config;
  } catch (e) {
    // config.json 是可选的，加载失败静默跳过
  }
}

export function setUserData(data) {
  localStorage.setItem('user', JSON.stringify(data));
}
